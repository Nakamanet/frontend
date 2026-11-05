'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'
import { useAuth } from '../../context/AuthContext'
import api from '../../lib/axios'
import { useGeolocation } from '../../hooks/useGeolocalisation'
import Link from 'next/link'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import HaloBackdrop from '@/app/components/ui/HaloBackdrop'
import { PeekingBlossoms } from '@/app/components/ui/Blossom'
import { isAxiosError } from 'axios'

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!

// Messages affichés selon le champ rejeté par l'API (ses messages sont en anglais)
const FIELD_ERRORS: Record<string, string> = {
  username: 'Ce pseudo est déjà pris',
  email: 'Un compte existe déjà avec cet email',
  birthdate: 'Date de naissance invalide (15 ans minimum)',
  password: 'Le mot de passe doit faire au moins 8 caractères',
  turnstile_token: 'La vérification anti-robot a échoué, réessaie',
  code: 'Code invalide ou expiré',
}

function apiErrorMessage(err: unknown, fallback: string): string {
  if (!isAxiosError(err) || !err.response) return fallback
  const { status, data } = err.response
  if (status === 429) return 'Trop de tentatives, patiente une minute avant de réessayer'
  if (status === 503) return "L'email n'a pas pu être envoyé, réessaie dans un instant"
  const field = Object.keys(data?.errors ?? {})[0]
  return (field && FIELD_ERRORS[field]) || fallback
}

export default function RegisterPage() {
  const { login, isLoggedIn, isAuthLoading } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()
  const { location, loading, detect } = useGeolocation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [error, setError] = useState('')
  const [turnstileToken, setTurnstileToken] = useState('')
  const [step, setStep] = useState<'form' | 'code'>('form')
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resendIn, setResendIn] = useState(0)
  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetIdRef = useRef<string | null>(null)

  // compte à rebours avant de pouvoir redemander un code
  useEffect(() => {
    if (resendIn <= 0) return
    const timer = setTimeout(() => setResendIn((s) => s - 1), 1000)
    return () => clearTimeout(timer)
  }, [resendIn])

  useEffect(() => {
    if (!isAuthLoading && isLoggedIn) {
      router.replace('/')
    }
  }, [isAuthLoading, isLoggedIn, router])

  // géoloc uniquement pour un visiteur non connecté : inutile de demander
  // la permission à quelqu'un qu'on redirige immédiatement
  useEffect(() => {
    if (isAuthLoading || isLoggedIn) return
    detect()
  }, [isAuthLoading, isLoggedIn, detect])

  if (isAuthLoading || isLoggedIn) {
    return <Loader variant="plain" className="min-h-[80vh]" />
  }

  const today = new Date()
  const maxBirthdate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0]
  const minBirthdate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0]

  const renderTurnstile = () => {
    if (turnstileWidgetIdRef.current || !turnstileContainerRef.current || !window.turnstile) return
    turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: TURNSTILE_SITE_KEY,
      action: 'register',
      // invisible tant que Cloudflare n'a pas besoin d'un clic de l'utilisateur
      appearance: 'interaction-only',
      callback: (token) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(''),
    })
  }

  // un jeton Turnstile ne sert qu'une fois : on en redemande un après chaque envoi
  const resetTurnstile = () => {
    setTurnstileToken('')
    if (turnstileWidgetIdRef.current) window.turnstile?.reset(turnstileWidgetIdRef.current)
  }

  const accountPayload = () => ({
    username,
    email,
    password,
    password_confirmation: passwordConfirmation,
    birthdate,
    localisation: location || null,
  })

  // étape 1 (et « renvoyer le code ») : l'API valide le formulaire + Turnstile puis envoie le code
  const sendCode = async () => {
    if (!turnstileToken) {
      setError('Vérification anti-robot en cours, veuillez patienter...')
      return
    }
    setSubmitting(true)
    try {
      const response = await api.post('/auth/register/send-code', {
        ...accountPayload(),
        turnstile_token: turnstileToken,
      })
      setError('')
      setCode('')
      setStep('code')
      setResendIn(response.data.retry_after ?? 60)
      showToast(`Code envoyé à ${email}`, 'success')
    } catch (err) {
      setError(apiErrorMessage(err, "Impossible d'envoyer le code"))
      if (isAxiosError(err) && err.response?.status === 429) {
        setResendIn(err.response.data?.retry_after ?? 60)
      }
    } finally {
      resetTurnstile()
      setSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== passwordConfirmation) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (birthdate > maxBirthdate) {
      setError('Vous devez avoir au moins 15 ans pour vous inscrire')
      return
    }

    if (birthdate < minBirthdate) {
      setError('Veuillez saisir une date de naissance valide')
      return
    }

    if (loading) {
      setError('Localisation en cours de détection, veuillez patienter...')
      return
    }

    await sendCode()
  }

  // étape 2 : création du compte avec le code reçu par email
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const response = await api.post('/auth/register', { ...accountPayload(), code })
      showToast('Inscription réussie', 'success')
      login(response.data.token, response.data.user, response.data.expires_in)
      router.push('/')
    } catch (err) {
      setError(apiErrorMessage(err, 'Echec lors de la création de compte'))
    } finally {
      setSubmitting(false)
    }
  }

  const backToForm = () => {
    setError('')
    setStep('form')
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-muted border border-border text-white placeholder:text-white/25 outline-none focus:border-primary transition-colors"

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-12">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onLoad={renderTurnstile}
      />
      {/* Background effect */}
      <HaloBackdrop />

      {/* Form */}
      <div className="relative z-10 w-full max-w-md mx-4 flex flex-col gap-4">
        <div className="relative">
          <PeekingBlossoms />
          <div className="relative z-10 bg-accent/80 backdrop-blur-sm border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">
              {step === 'form' ? 'Créer un compte' : 'Vérifie ton email'}
            </h2>

            {step === 'code' && (
              <form onSubmit={handleVerify} className="flex flex-col gap-4">
                <p className="text-sm text-white/70">
                  Un code à 6 chiffres a été envoyé à <span className="text-white font-medium">{email}</span>.
                  Il expire dans 10 minutes.
                </p>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="register-code" className="text-sm font-medium text-white/70">Code de vérification</label>
                  <input
                    id="register-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    placeholder="123456"
                    className={`${inputClass} text-center text-2xl tracking-[0.5em]`}
                    required
                    autoFocus
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={submitting || code.length !== 6}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary/85 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base transition-colors mt-2 cursor-pointer"
                >
                  Valider
                </button>

                <div className="flex justify-between text-sm">
                  <button type="button" onClick={backToForm} className="text-white/50 hover:text-white transition-colors cursor-pointer">
                    Modifier mes informations
                  </button>
                  <button
                    type="button"
                    onClick={sendCode}
                    disabled={submitting || resendIn > 0 || !turnstileToken}
                    className="text-white/50 hover:text-white disabled:hover:text-white/50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    {resendIn > 0 ? `Renvoyer le code (${resendIn}s)` : 'Renvoyer le code'}
                  </button>
                </div>
              </form>
            )}

            <form onSubmit={handleSubmit} className={step === 'form' ? 'flex flex-col gap-4' : 'hidden'}>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/70">Nom d&apos;utilisateur</label>
                <input
                  type="text"
                  placeholder="Pseudo"
                  className={inputClass}
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  maxLength={50}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/70">Email</label>
                <input
                  type="email"
                  placeholder="email@exemple.com"
                  className={inputClass}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={100}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/70">Date de naissance</label>
                <input
                  type="date"
                  className={inputClass}
                  required
                  min={minBirthdate}
                  max={maxBirthdate}
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/70">Mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/70">Confirmation du mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className={inputClass}
                  required
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  minLength={8}
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary/85 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base transition-colors mt-2 cursor-pointer"
              >
                S&apos;inscrire
              </button>
            </form>

            {/* hors des formulaires : il doit rester monté pour « Renvoyer le code » */}
            <div ref={turnstileContainerRef} className="flex justify-center mt-4" />
          </div>
        </div>

        <p className="text-center text-white/50 text-sm">
          Ou si vous avez déjà un compte,{' '}
          <Link href="/login" className="text-white underline hover:text-white/80 transition-colors">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
