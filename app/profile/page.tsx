import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from '@/actions/auth'
import Image from 'next/image'

export const metadata = { title: 'Mon profil · Relire' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('username, display_name, avatar_url, favorite_genres, created_at')
    .eq('id', user.id)
    .single()

  const joinedAt = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
    : null

  return (
    <div className="min-h-screen px-4 py-12" style={{ background: '#f5f4f0' }}>
      <div className="max-w-lg mx-auto space-y-4">

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold tracking-tight" style={{ color: '#002F45' }}>Relire</h1>
        </div>

        {/* Profile card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt="Avatar"
                width={56}
                height={56}
                className="rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                style={{ background: '#002F45' }}
              >
                {profile?.display_name?.[0]?.toUpperCase() ?? '?'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">{profile?.display_name ?? 'Sans nom'}</p>
              {profile?.username && (
                <p className="text-sm text-gray-400 truncate">@{profile.username}</p>
              )}
              {joinedAt && (
                <p className="text-xs text-gray-400 mt-0.5">Membre depuis {joinedAt}</p>
              )}
            </div>
          </div>

          {profile?.favorite_genres && profile.favorite_genres.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-50">
              <p className="text-xs font-medium text-gray-400 mb-2">Genres favoris</p>
              <div className="flex flex-wrap gap-1.5">
                {profile.favorite_genres.map(genre => (
                  <span
                    key={genre}
                    className="text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: '#BCD4CC', color: '#002F45' }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Account */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          <div className="px-5 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Compte</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
          <div className="px-5 py-4">
            <p className="text-xs text-gray-400">Identifiant Supabase</p>
            <p className="text-xs text-gray-300 font-mono truncate">{user.id}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
          <div className="px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-gray-700">Modifier le profil</span>
            <span className="text-xs text-gray-400">Bientôt →</span>
          </div>
          <div className="px-5 py-4 flex items-center justify-between">
            <span className="text-sm text-gray-700">Paramètres</span>
            <span className="text-xs text-gray-400">Bientôt →</span>
          </div>
        </div>

        {/* Sign out */}
        <form action={signOut}>
          <button
            type="submit"
            className="w-full py-3 rounded-2xl text-sm font-semibold border-2 transition-colors"
            style={{ borderColor: '#002F45', color: '#002F45', background: 'white' }}
          >
            Se déconnecter
          </button>
        </form>

      </div>
    </div>
  )
}
