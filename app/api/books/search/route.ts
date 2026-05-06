import { searchBooks } from '@/lib/google-books/client'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()

  if (!q) return NextResponse.json({ items: [], totalItems: 0 })

  try {
    const results = await searchBooks({ query: q, maxResults: 10 })
    return NextResponse.json(results)
  } catch {
    return NextResponse.json({ error: 'Erreur de recherche' }, { status: 500 })
  }
}
