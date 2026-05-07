'use client'

import Link from 'next/link'

export default function ImportPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold" style={{ color: '#002F45' }}>Importez votre bibliothèque</h2>
        <p className="text-sm text-gray-500 mt-1">
          Rien à ressaisir — vos notes et étagères arrivent en quelques secondes.
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: '2px solid #BCD4CC' }}>
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-base font-bold"
              style={{ background: '#002F45' }}
            >
              G
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">Importer depuis Goodreads</p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
                  style={{ background: '#BCD4CC', color: '#002F45' }}
                >
                  Bientôt
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Vos notes, étagères et critiques en 1 clic</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm opacity-60">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400 text-base font-bold">
              S
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-900">Depuis The Storygraph</p>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500 flex-shrink-0">
                  Bientôt
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">Importez votre export CSV</p>
            </div>
          </div>
        </div>

        <Link
          href="/onboarding/genres"
          className="block bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 text-gray-400 text-2xl">
              +
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Commencer manuellement</p>
              <p className="text-xs text-gray-400 mt-0.5">Construire votre bibliothèque livre par livre</p>
            </div>
          </div>
        </Link>
      </div>

      <Link
        href="/onboarding/genres"
        className="block w-full text-center text-sm text-gray-400 hover:text-gray-600 mt-5 py-2 transition-colors"
      >
        Passer — je ferai ça plus tard
      </Link>
    </div>
  )
}
