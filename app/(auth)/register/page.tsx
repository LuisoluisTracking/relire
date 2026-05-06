'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { signUpWithEmail, getOAuthUrl } from '@/actions/auth'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await signUpWithEmail(email, password)
      if (!result) return
      if ('error' in result) setError(result.error ?? 'Erreur')
      else if ('needsConfirmation' in result) setConfirmed(true)
    })
  }

  function handleOAuth(provider: 'google' | 'facebook') {
    startTransition(async () => {
      const result = await getOAuthUrl(provider)
      if ('url' in result) window.location.href = result.url
      else setError(result.error ?? 'Erreur')
    })
  }

  if (confirmed) {
    return (
      <div className="bg-white rounded-xl border p-6 text-center space-y-3">
        <div className="text-4xl">📬</div>
        <h2 className="text-lg font-semibold">Vérifiez votre email</h2>
        <p className="text-sm text-gray-500">
          Un lien de confirmation a été envoyé à <strong>{email}</strong>.<br />
          Cliquez dessus pour activer votre compte.
        </p>
        <Link href="/login" className="text-sm text-black font-medium hover:underline">
          Retour à la connexion
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Relire</h1>
        <p className="text-sm text-gray-500 mt-1">Rejoignez la communauté</p>
      </div>

      <div className="bg-white rounded-xl border p-6 space-y-4">
        <h2 className="text-lg font-semibold">Créer un compte</h2>

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

        <form onSubmit={handleRegister} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Mot de passe</Label>
            <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            <p className="text-xs text-gray-400">6 caractères minimum</p>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? 'Création…' : 'Créer mon compte'}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500">
          Déjà un compte ?{' '}
          <Link href="/login" className="font-medium text-black hover:underline">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
