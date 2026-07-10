'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import api from '../../lib/axios'
import { useGeolocation } from '../../hooks/useGeolocalisation'
import Link from 'next/link'
import { useToast } from '@/app/context/ToastContext'

export default function RegisterPage() {
  const { login } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()
  const { location, loading, detect } = useGeolocation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [error, setError] = useState('')

  const today = new Date()
  const maxBirthdate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0]
  const minBirthdate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0]

  useEffect(() => {
    detect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
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

      const response = await api.post('/auth/register', {
        username,
        email,
        password,
        password_confirmation: passwordConfirmation,
        birthdate,
        localisation: location || null,
      })
      showToast('Inscription réussi', 'success')
      login(response.data.token, response.data.user, response.data.expires_in)
      router.push('/')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Echec lors de la création de compte', 'error')
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl bg-muted border border-border text-white placeholder:text-white/25 outline-none focus:border-primary transition-colors"

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden py-12">
      {/* Background effect */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(225,16,72,0.28) 0%, rgba(225,16,72,0.08) 45%, transparent 70%), #0e1520',
        }}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'repeating-conic-gradient(from 0deg at 50% 50%, rgba(225,16,72,0.12) 0deg, transparent 1.5deg, transparent 9deg)',
        }}
      />

      {/* Form */}
      <div className="relative z-10 w-full max-w-md mx-4 flex flex-col gap-4">
        <div className="bg-accent/80 backdrop-blur-sm border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Créer un compte</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-white/70">Nom d&apos;utilisateur</label>
              <input
                type="text"
                placeholder="Pseudo"
                className={inputClass}
                required
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
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                minLength={8}
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary/85 text-white font-bold text-base transition-colors mt-2 cursor-pointer"
            >
              S&apos;inscrire
            </button>
          </form>
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
