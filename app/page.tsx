import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

const FAKE_ACTIVITY = [
  { initials: 'SL', name: 'sophie_lit', action: 'a terminé', book: 'Le Nom de la Rose', rating: 5, time: 'il y a 2h' },
  { initials: 'MK', name: 'marc.reads', action: 'a ajouté à sa liste "2024"', book: 'Piranesi', rating: null, time: 'il y a 4h' },
  { initials: 'AL', name: 'ana_lit', action: 'commence', book: 'Tomorrow, and Tomorrow, and Tomorrow', rating: null, time: 'hier' },
  { initials: 'JD', name: 'julien_d', action: 'a noté 4★', book: 'Dune', rating: 4, time: 'hier' },
  { initials: 'CM', name: 'claire.m', action: 'a terminé', book: '1984', rating: 5, time: 'il y a 2j' },
]

const COVERS = ['#9FE1CB', '#F5C4B3', '#BCD4CC', '#FAC775', '#F4C0D1', '#C5D5E8']

export default async function Home() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) redirect('/profile')
  } catch {}

  return (
    <main className="min-h-screen bg-white">
      <nav className="px-6 py-4 flex items-center justify-between" style={{ background: '#002F45' }}>
        <span className="text-white font-bold text-lg tracking-tight">Relire</span>
        <Link href="/login" className="text-sm font-medium transition-colors" style={{ color: '#BCD4CC' }}>
          Se connecter
        </Link>
      </nav>

      <section style={{ background: '#002F45' }} className="px-6 pb-16 pt-4 flex flex-col items-center text-center">
        <div className="flex gap-2.5 mb-10">
          {COVERS.map((color, i) => (
            <div
              key={i}
              className="rounded flex-shrink-0 shadow-md"
              style={{ width: 42, height: 64, background: color }}
            />
          ))}
        </div>

        <h1 className="text-white text-3xl sm:text-4xl font-bold tracking-tight max-w-xs mb-4 leading-tight">
          Votre vie de lecteur,<br />enfin bien rangée.
        </h1>
        <p className="text-sm leading-relaxed mb-10 max-w-xs" style={{ color: 'rgba(188,212,204,0.75)' }}>
          Suivez vos lectures, découvrez via vos amis,<br />importez depuis Goodreads en 1 clic.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
          <Link
            href="/register"
            className="flex-1 px-5 py-3 rounded-lg text-sm font-semibold text-center transition-colors"
            style={{ background: '#BCD4CC', color: '#002F45' }}
          >
            Commencer — c'est gratuit
          </Link>
          <a
            href="#demo"
            className="flex-1 px-5 py-3 rounded-lg text-sm font-medium text-center border transition-colors"
            style={{ borderColor: 'rgba(188,212,204,0.3)', color: '#BCD4CC' }}
          >
            Voir la démo
          </a>
        </div>
      </section>

      <section id="demo" className="max-w-md mx-auto px-4 py-12">
        <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: '#002F45', opacity: 0.35 }}>
          Ce qui se passe sur Relire
        </p>
        <div className="border border-gray-100 rounded-2xl overflow-hidden divide-y divide-gray-50">
          {FAKE_ACTIVITY.map((item, i) => (
            <div key={i} className="flex items-start gap-3 px-4 py-3.5 bg-white">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white mt-0.5"
                style={{ background: '#002F45' }}
              >
                {item.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-snug">
                  <span className="font-semibold text-gray-900">{item.name}</span>
                  {' '}{item.action}{' '}
                  <em className="text-gray-600 not-italic">"{item.book}"</em>
                  {item.rating && (
                    <span className="ml-1.5" style={{ color: '#E3A750' }}>
                      {'★'.repeat(item.rating)}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Et des milliers d'autres lecteurs.{' '}
          <Link href="/register" className="font-semibold underline underline-offset-2" style={{ color: '#002F45' }}>
            Rejoignez-les →
          </Link>
        </p>
      </section>
    </main>
  )
}
