'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { signInWithEmail, getOAuthUrl } from '@/actions/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await signInWithEmail(email, password)
      if (result?.error) setError(result.error)
    })
  }

  function handleOAuth(provider: 'google' | 'facebook') {
    startTransition(async () => {
      const result = await getOAuthUrl(provider)
      if ('url' in result) window.location.href = result.url
      else setError(result.error ?? 'Erreur')
    })
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Relire</h1>
        <p className="text-sm text-gray-500 mt-1">Suivez vos lectures</p>
      </div>

      <div className="bg-white rounded-xl border p-6 space-y-4">
        <h2 className="text-lg font-semibold">Connexion</h2>

        <div className="space-y-2">
          <Button variant="outline" className="w-full" onClick={() => handleOAuth('google')} disabled={isPending}>
            Continuer avec Google
          </Button>
          <Button variant="outline" className="w-full" onClick={() => handleOAuth('facebook')} disabled={isPending}>
            Continuer avec Facebook
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-xs text-gray-400">ou</span>
          <Separator className="flex-1" />
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Pas encore de compte ?{' '}
          <Link href="/register" className="font-medium text-black hover:underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}
