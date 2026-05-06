'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateProfile } from '@/actions/onboarding'

type Props = {
  defaultDisplayName: string
  avatarUrl: string | null
}

export function ProfileForm({ defaultDisplayName, avatarUrl }: Props) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState(defaultDisplayName)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      const result = await updateProfile({ username, display_name: displayName })
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="bg-white rounded-xl border p-6">
      {avatarUrl && (
        <div className="flex justify-center mb-6">
          <Image
            src={avatarUrl}
            alt="Avatar"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="username">Nom d'utilisateur *</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">@</span>
            <Input
              id="username"
              className="pl-7"
              value={username}
              onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
              placeholder="nom_utilisateur"
              minLength={3}
              maxLength={20}
              required
            />
          </div>
          <p className="text-xs text-gray-400">3–20 caractères · lettres minuscules, chiffres, underscores</p>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="display-name">Nom affiché *</Label>
          <Input
            id="display-name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            placeholder="Votre nom"
            maxLength={50}
            required
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? 'Enregistrement…' : 'Continuer'}
        </Button>
      </form>
    </div>
  )
}
