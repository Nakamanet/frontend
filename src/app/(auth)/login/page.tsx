'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '../../lib/axios'
import { useAuth } from '../../context/AuthContext'
import Link from 'next/link'
import { useToast } from '@/app/context/ToastContext'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const { showToast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await api.post('/auth/login', { email, password })
      showToast('Connexion réussi', 'success')
      login(response.data.token, response.data.user, response.data.expires_in)
      router.push('/')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showToast('Email ou mot de passe invalide', 'error')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="card-title text-2xl font-bold">Se connecter</h2>

          <div className="form-control flex flex-col">
            <label className="label">Email</label>
            <input
              type="email"
              placeholder="email@exemple.com"
              className="input input-bordered"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control flex flex-col">
            <label className="label">Mot de passe</label>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">
              Se connecter
            </button>
          </div>
        </form>
        <div className="card-body flex justify-center w-full">
          <p>
            Ou si vous n&apos;avez pas encore de compte,{' '}
            <Link href="/register" className="border-b">
              S&apos;inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
