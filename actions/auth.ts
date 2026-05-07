'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signInWithEmail(email: string, password: string) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    const msg = error.message === 'Invalid login credentials'
      ? 'Email ou mot de passe incorrect. Pas encore de compte ? Inscrivez-vous.'
      : error.message
    return { error: msg }
  }
  redirect('/')
}

export async function signUpWithEmail(email: string, password: string, username?: string) {
  const supabase = await createClient()

  if (username) {
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .maybeSingle()
    if (existing) return { error: "Ce nom d'utilisateur est déjà pris." }
  }

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    const msg =
      error.message.toLowerCase().includes('already registered') ||
      error.message.toLowerCase().includes('already been registered') ||
      error.message.toLowerCase().includes('user already')
        ? 'Un compte existe déjà avec cet email. Connectez-vous plutôt.'
        : error.message
    return { error: msg }
  }

  if (data.user && !data.session) return { needsConfirmation: true }

  if (username && data.user) {
    await supabase.from('users').update({ username, display_name: username }).eq('id', data.user.id)
  }

  redirect('/onboarding/import')
}

export async function getOAuthUrl(provider: 'google' | 'facebook'): Promise<{ url: string } | { error: string }> {
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
