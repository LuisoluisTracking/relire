'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
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
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold" style={{ color: '#002F45' }}>Comment vous appelle-t-on ?</h2>
        <p className="text-sm text-gray-500 mt-1">Votre username est votre identité sur Relire.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        {avatarUrl && (
          <div className="flex justify-center mb-6">
            <Image src={avatarUrl} alt="Avatar" width={64} height={64} className="rounded-full object-cover" />
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Nom d'utilisateur *</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm select-none">@</span>
              <input
                className="w-full pl-8 pr-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#002F45] transition-colors"
                value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                placeholder="nom_utilisateur"
                minLength={3}
                maxLength={20}
                required
              />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">3–20 caractères · lettres minuscules, chiffres, underscores</p>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Nom affiché *</label>
            <input
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-[#002F45] transition-colors"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
              placeholder="Votre prénom"
              maxLength={50}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-60"
            style={{ background: '#002F45' }}
          >
            {isPending ? 'Enregistrement…' : 'Continuer'}
          </button>
        </form>
      </div>
    </div>
  )
}
