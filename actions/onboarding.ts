'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function updateProfile({
  username,
  display_name,
}: {
  username: string
  display_name: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .neq('id', user.id)
    .maybeSingle()

  if (existing) return { error: "Ce nom d'utilisateur est déjà pris." }

  const { error } = await supabase
    .from('users')
    .update({ username, display_name })
    .eq('id', user.id)

  if (error) return { error: error.message }
  redirect('/onboarding/genres')
}

export async function updateGenres(genres: string[]) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { error } = await supabase
    .from('users')
    .update({ favorite_genres: genres })
    .eq('id', user.id)

  if (error) return { error: error.message }
  redirect('/onboarding/import')
}

export async function addBookEntry(book: {
  isbn_13: string
  google_id: string
  title: string
  authors: string[]
  cover_url: string | null
  language: string | null
  published_date: string | null
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Non authentifié' }

  await supabase.from('books').upsert(
    {
      isbn_13: book.isbn_13,
      google_id: book.google_id,
      title: book.title,
      authors: book.authors,
      cover_url: book.cover_url,
      language: book.language,
      published_date: book.published_date,
    },
    { onConflict: 'isbn_13' }
  )

  const { error } = await supabase.from('reading_entries').upsert(
    { user_id: user.id, isbn_13: book.isbn_13, status: 'read' },
    { onConflict: 'user_id,isbn_13' }
  )

  if (error) return { error: error.message }
  return { success: true }
}

export async function completeOnboarding() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  await supabase
    .from('users')
    .update({ onboarding_completed: true })
    .eq('id', user.id)

  redirect('/')
}
