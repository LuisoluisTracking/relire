'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { BOOK_GENRES } from '@/lib/constants/genres'
import { updateGenres } from '@/actions/onboarding'

export default function GenresPage() {
  const [selected, setSelected] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

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
        <h2 className="text-xl font-semibold">Vos genres préférés</h2>
        <p className="text-sm text-gray-500 mt-1">
          Sélectionnez au moins un genre pour personnaliser votre expérience.
        </p>
      </div>

      <div className="bg-white rounded-xl border p-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          {BOOK_GENRES.map(genre => (
            <button
              key={genre.id}
              type="button"
              onClick={() => toggle(genre.id)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
                selected.includes(genre.id)
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
              }`}
            >
              {genre.label}
            </button>
          ))}
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={isPending || selected.length === 0}
        >
          {isPending
            ? 'Enregistrement…'
            : selected.length > 0
            ? `Continuer · ${selected.length} sélectionné${selected.length > 1 ? 's' : ''}`
            : 'Continuer'}
        </Button>
      </div>
    </div>
  )
}
