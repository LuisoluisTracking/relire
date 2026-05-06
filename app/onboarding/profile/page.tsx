import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ProfileForm } from './profile-form'

export const metadata = { title: 'Votre profil' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('users')
    .select('display_name, avatar_url')
    .eq('id', user.id)
    .single()

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Votre profil</h2>
        <p className="text-sm text-gray-500 mt-1">Choisissez comment vous apparaîtrez sur Relire.</p>
      </div>
      <ProfileForm
        defaultDisplayName={profile?.display_name ?? ''}
        avatarUrl={profile?.avatar_url ?? null}
      />
    </div>
  )
}
