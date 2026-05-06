const BASE_URL = 'https://www.googleapis.com/books/v1'

export type GoogleBooksVolume = {
  id: string
  volumeInfo: {
    title: string
    subtitle?: string
    authors?: string[]
    publisher?: string
    publishedDate?: string
    description?: string
    pageCount?: number
    language?: string
    categories?: string[]
    imageLinks?: {
      smallThumbnail?: string
      thumbnail?: string
      small?: string
      medium?: string
      large?: string
    }
    industryIdentifiers?: Array<{
      type: 'ISBN_10' | 'ISBN_13' | 'ISSN' | 'OTHER'
      identifier: string
    }>
    averageRating?: number
    ratingsCount?: number
  }
}

type SearchParams = {
  query: string
  lang?: 'fr' | 'en'
  maxResults?: number
  startIndex?: number
}

function withHttps(url?: string): string | undefined {
  return url?.replace('http://', 'https://')
}

export function getIsbn13(volume: GoogleBooksVolume): string | null {
  return volume.volumeInfo.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier ?? null
}

function buildParams(extra: Record<string, string>) {
  const params = new URLSearchParams(extra)
  if (process.env.GOOGLE_BOOKS_API_KEY) params.set('key', process.env.GOOGLE_BOOKS_API_KEY)
  return params
}

export async function searchBooks({ query, lang, maxResults = 20, startIndex = 0 }: SearchParams) {
  const params = buildParams({
    q: query,
    maxResults: String(maxResults),
    startIndex: String(startIndex),
    printType: 'books',
    projection: 'lite',
    fields: 'totalItems,items(id,volumeInfo(title,subtitle,authors,publishedDate,language,imageLinks/thumbnail,industryIdentifiers))',
  })
  if (lang) params.set('langRestrict', lang)

  const res = await fetch(`${BASE_URL}/volumes?${params}`, {
    headers: { 'Accept-Encoding': 'gzip', 'User-Agent': 'Relire/1.0 gzip' },
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Google Books API: ${res.status}`)

  const data = await res.json()
  return {
    totalItems: data.totalItems as number,
    items: (data.items ?? []) as GoogleBooksVolume[],
  }
}

export async function getBookById(volumeId: string): Promise<GoogleBooksVolume> {
  const params = buildParams({
    projection: 'full',
    fields: 'id,volumeInfo(title,subtitle,authors,publisher,publishedDate,description,pageCount,language,categories,imageLinks,industryIdentifiers,averageRating,ratingsCount)',
  })

  const res = await fetch(`${BASE_URL}/volumes/${volumeId}?${params}`, {
    headers: { 'Accept-Encoding': 'gzip', 'User-Agent': 'Relire/1.0 gzip' },
    next: { revalidate: 86400 },
  })
  if (!res.ok) throw new Error(`Google Books API: ${res.status}`)

  const volume = await res.json() as GoogleBooksVolume
  const links = volume.volumeInfo.imageLinks

  return {
    ...volume,
    volumeInfo: {
      ...volume.volumeInfo,
      imageLinks: links ? {
        smallThumbnail: withHttps(links.smallThumbnail),
        thumbnail: withHttps(links.thumbnail),
        small: withHttps(links.small),
        medium: withHttps(links.medium),
        large: withHttps(links.large),
      } : undefined,
    },
  }
}
