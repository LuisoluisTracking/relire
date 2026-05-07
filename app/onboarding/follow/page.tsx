'use client'

import { useState, useTransition } from 'react'
import { completeOnboarding } from '@/actions/onboarding'

const SUGGESTED_READERS = [
  { initials: 'SL', name: 'sophie_lit', display: 'Sophie L.', books: 214, genres: 'Fantasy, Littérature' },
  { initials: 'MK', name: 'marc.reads', display: 'Marc K.', books: 87, genres: 'SF, Policier' },
  { initials: 'AL', name: 'ana_lit', display: 'Ana L.', books: 156, genres: 'Romance, Contemporain' },
  { initials: 'JD', name: 'julien_d', display: 'Julien D.', books: 332, genres: 'Thriller, Historique' },
]

export default function FollowPage() {
  const [following, setFollowing] = useState<Set<string>>(new Set())
  const [isPending, startTransition] = useTransition()

  function toggle(name: string) {
    setFollowing(prev => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }

  function handleFinish() {
    startTransition(async () => { await completeOnboarding() })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold" style={{ color: '#002F45' }}>Suivez des lecteurs</h2>
        <p className="text-sm text-gray-500 mt-1">
          Votre feed sera vide sans eux.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {SUGGESTED_READERS.map(reader => {
          const isFollowing = following.has(reader.name)
          return (
            <div key={reader.name} className="flex items-center gap-4 px-5 py-4">
              <div
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                style={{ background: '#002F45' }}
              >
                {reader.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{reader.display}</p>
                <p className="text-xs text-gray-400 mt-0.5">{reader.books} livres · {reader.genres}</p>
              </div>
              <button
                onClick={() => toggle(reader.name)}
                className="text-xs px-3.5 py-1.5 rounded-full font-semibold transition-colors flex-shrink-0"
                style={
                  isFollowing
                    ? { background: '#BCD4CC', color: '#002F45' }
                    : { background: '#f3f4f6', color: '#374151' }
                }
              >
                {isFollowing ? 'Suivi ✓' : '+ Suivre'}
              </button>
            </div>
          )
        })}
      </div>

      <div className="mt-4 space-y-2">
        <button
          onClick={handleFinish}
          disabled={isPending}
          className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-60"
          style={{ background: '#002F45' }}
        >
          {isPending ? 'Finalisation…' : 'Accéder à mon profil →'}
        </button>
        <button
          onClick={handleFinish}
          disabled={isPending}
          className="w-full py-2 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Passer — je chercherai plus tard
        </button>
      </div>
    </div>
  )
}
