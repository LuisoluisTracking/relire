'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { BOOK_GENRES } from '@/lib/constants/genres'
import { updateGenres } from '@/actions/onboarding'

export default function GenresPage() {
  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function toggle(id: string) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  function handleSubmit() {
    if (selected.length === 0) {
      setError('Sélectionnez au moins un genre.')
      return
    }
    setError(null)
    startTransition(async () => {
      const result = await updateGenres(selected)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold" style={{ color: '#002F45' }}>Qu'est-ce que vous aimez lire ?</h2>
        <p className="text-sm text-gray-500 mt-1">
          Choisissez au moins un genre pour personnaliser votre feed.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
        <div className="flex flex-wrap gap-2 mb-5">
          {BOOK_GENRES.map(genre => (
            <button
              key={genre.id}
              type="button"
              onClick={() => toggle(genre.id)}
              className="px-3.5 py-1.5 rounded-full text-sm border transition-colors cursor-pointer font-medium"
              style={
                selected.includes(genre.id)
                  ? { background: '#BCD4CC', borderColor: '#BCD4CC', color: '#002F45' }
                  : { background: 'white', borderColor: '#e5e7eb', color: '#4b5563' }
              }
            >
              {genre.label}
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={isPending || selected.length === 0}
          className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-50"
          style={{ background: '#002F45' }}
        >
          {isPending
            ? 'Enregistrement…'
            : selected.length > 0
            ? `Continuer · ${selected.length} sélectionné${selected.length > 1 ? 's' : ''}`
            : 'Continuer'}
        </button>
      </div>

      <button
        onClick={() => router.push('/onboarding/notes')}
        className="block w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-4 py-2 transition-colors"
      >
        Passer cette étape
      </button>
    </div>
  )
}
