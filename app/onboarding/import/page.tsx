'use client'

import { useState, useTransition } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { addBookEntry, completeOnboarding } from '@/actions/onboarding'
import { getIsbn13, type GoogleBooksVolume } from '@/lib/google-books/client'

export default function ImportPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<GoogleBooksVolume[]>([])
  const [added, setAdded] = useState<Set<string>>(new Set())
  const [searching, setSearching] = useState(false)
  const [isPending, startTransition] = useTransition()

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setSearching(true)
    try {
      const res = await fetch(`/api/books/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setResults(data.items ?? [])
    } finally {
      setSearching(false)
    }
  }

  async function handleAdd(volume: GoogleBooksVolume) {
    const isbn = getIsbn13(volume)
    if (!isbn) return
    const result = await addBookEntry({
      isbn_13: isbn,
      google_id: volume.id,
      title: volume.volumeInfo.title,
      authors: volume.volumeInfo.authors ?? [],
      cover_url: volume.volumeInfo.imageLinks?.thumbnail ?? null,
      language: volume.volumeInfo.language ?? null,
      published_date: volume.volumeInfo.publishedDate ?? null,
    })
    if (!result?.error) setAdded(prev => new Set(prev).add(isbn))
  }

  function handleFinish() {
    startTransition(async () => { await completeOnboarding() })
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Vos lectures passées</h2>
        <p className="text-sm text-gray-500 mt-1">
          Ajoutez des livres que vous avez déjà lus. Vous pouvez passer cette étape.
        </p>
      </div>

      <div className="bg-white rounded-xl border p-6 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Titre ou auteur…"
          />
          <Button type="submit" variant="outline" disabled={searching} className="shrink-0">
            {searching ? '…' : 'Chercher'}
          </Button>
        </form>

        {results.length > 0 && (
          <div className="space-y-1 max-h-72 overflow-y-auto -mx-1 px-1">
            {results.map(vol => {
              const isbn = getIsbn13(vol)
              const isAdded = isbn ? added.has(isbn) : false
              const cover = vol.volumeInfo.imageLinks?.thumbnail

              return (
                <div key={vol.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-9 h-13 shrink-0">
                    {cover ? (
                      <Image src={cover} alt="" width={36} height={52} className="rounded object-cover w-9 h-13" />
                    ) : (
                      <div className="w-9 h-13 bg-gray-100 rounded" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{vol.volumeInfo.title}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {vol.volumeInfo.authors?.join(', ') ?? 'Auteur inconnu'}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={isAdded ? 'outline' : 'default'}
                    onClick={() => handleAdd(vol)}
                    disabled={isAdded || !isbn}
                    className="shrink-0"
                  >
                    {isAdded ? 'Ajouté ✓' : 'Ajouter'}
                  </Button>
                </div>
              )
            })}
          </div>
        )}

        {added.size > 0 && (
          <p className="text-sm text-gray-500">
            {added.size} livre{added.size > 1 ? 's' : ''} ajouté{added.size > 1 ? 's' : ''}
          </p>
        )}

        <div className="flex gap-2 pt-2 border-t">
          <Button variant="outline" className="flex-1" onClick={handleFinish} disabled={isPending}>
            Passer
          </Button>
          <Button className="flex-1" onClick={handleFinish} disabled={isPending}>
            {isPending ? 'Finalisation…' : 'Terminer'}
          </Button>
        </div>
      </div>
    </div>
  )
}
