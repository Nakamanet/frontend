'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '../../lib/axios'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'
import { useToast } from '@/app/context/ToastContext'
import Loader from '@/app/components/Loader'
import HaloBackdrop from '@/app/components/ui/HaloBackdrop'
import { PeekingBlossoms } from '@/app/components/ui/Blossom'

export default function LoginPage() {
  const { login, isLoggedIn, isAuthLoading } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!isAuthLoading && isLoggedIn) {
      router.replace('/')
    }
  }, [isAuthLoading, isLoggedIn, router])

  if (isAuthLoading || isLoggedIn) {
    return <Loader variant="plain" className="min-h-[80vh]" />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.post('/auth/login', { email, password })
      if (response.data.user.is_deleted) {
        showToast("Ce compte a été désactivé", 'error')
        return
      }
      showToast('Connexion réussi', 'success')
      login(response.data.token, response.data.user, response.data.expires_in)
      router.push('/')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Email ou mot de passe invalide', 'error')
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background effect */}
      <HaloBackdrop />

      {/* Form */}
      <div className="relative z-10 w-full max-w-md mx-4 flex flex-col gap-4">
        <div className="relative">
          <PeekingBlossoms />
          <div className="relative z-10 bg-accent/80 backdrop-blur-sm border border-border rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Se connecter</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/70">Email</label>
                <input
                  type="email"
                  placeholder="email@exemple.com"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-white placeholder:text-white/25 outline-none focus:border-primary transition-colors"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-white/70">Mot de passe</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-white placeholder:text-white/25 outline-none focus:border-primary transition-colors"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary/85 text-white font-bold text-base transition-colors mt-2 cursor-pointer"
              >
                Se connecter
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-white/50 text-sm">
          Ou si vous n&apos;avez pas encore de compte,{' '}
          <Link href="/register" className="text-white underline hover:text-white/80 transition-colors">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}
