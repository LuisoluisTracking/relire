'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }
  redirect('/')
}

export async function signUpWithEmail(email: string, password: string) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) return { error: error.message }
  if (data.user && !data.session) return { needsConfirmation: true }
  redirect('/onboarding/profile')
}

export async function getOAuthUrl(provider: 'google' | 'facebook') {
  const supabase = await createClient()
  const headersList = await headers()
  const origin = process.env.NEXT_PUBLIC_APP_URL ?? headersList.get('origin') ?? ''

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo: `${origin}/api/auth/callback` },
  })

  if (error || !data.url) return { error: error?.message ?? 'Erreur OAuth' }
  return { url: data.url }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
