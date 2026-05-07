'use client'

import { useState } from 'react'
import Link from 'next/link'

const SAMPLE_BOOKS = [
  { title: "Harry Potter à l'école des sorciers", author: 'J.K. Rowling', color: '#BCD4CC' },
  { title: 'Dune', author: 'Frank Herbert', color: '#E3A750' },
  { title: '1984', author: 'George Orwell', color: '#9FE1CB' },
  { title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', color: '#F5C4B3' },
  { title: 'L\'Alchimiste', author: 'Paulo Coelho', color: '#C5D5E8' },
]

export default function NotesPage() {
  const [ratings, setRatings] = useState<Record<number, number>>({})
  const [hovered, setHovered] = useState<{ book: number; star: number } | null>(null)

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold" style={{ color: '#002F45' }}>Notez des livres que vous avez lus</h2>
        <p className="text-sm text-gray-500 mt-1">
          Aide à personnaliser vos recommandations. Rien d'obligatoire.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {SAMPLE_BOOKS.map((book, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4">
            <div
              className="flex-shrink-0 rounded-md"
              style={{ width: 36, height: 52, background: book.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{book.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">{book.author}</p>
            </div>
            <div className="flex gap-0.5 flex-shrink-0">
              {[1, 2, 3, 4, 5].map(star => {
                const isActive = (hovered?.book === i ? hovered.star : ratings[i] ?? 0) >= star
                return (
                  <button
                    key={star}
                    onClick={() => setRatings(r => ({ ...r, [i]: star }))}
                    onMouseEnter={() => setHovered({ book: i, star })}
                    onMouseLeave={() => setHovered(null)}
                    className="text-xl leading-none transition-colors"
                    style={{ color: isActive ? '#E3A750' : '#e5e7eb' }}
                  >
                    ★
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <Link
          href="/onboarding/follow"
          className="block w-full py-2.5 rounded-lg text-sm font-semibold text-white text-center transition-colors"
          style={{ background: '#002F45' }}
        >
          Continuer
        </Link>
        <Link
          href="/onboarding/follow"
          className="block w-full py-2 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Passer — je noterai plus tard
        </Link>
      </div>
    </div>
  )
}
