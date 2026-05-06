export type ReadingStatus = 'want_to_read' | 'reading' | 'read' | 'abandoned'

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          bio: string | null
          avatar_url: string | null
          onboarding_completed: boolean
          favorite_genres: string[]
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at' | 'onboarding_completed' | 'favorite_genres'> & {
          onboarding_completed?: boolean
          favorite_genres?: string[]
        }
        Update: Partial<Database['public']['Tables']['users']['Insert']>
      }
      books: {
        Row: {
          isbn_13: string
          google_id: string | null
          title: string
          subtitle: string | null
          authors: string[] | null
          published_date: string | null
          description: string | null
          page_count: number | null
          language: string | null
          categories: string[] | null
          cover_url: string | null
          cached_at: string
        }
        Insert: Omit<Database['public']['Tables']['books']['Row'], 'cached_at'>
        Update: Partial<Database['public']['Tables']['books']['Insert']>
      }
      reading_entries: {
        Row: {
          id: string
          user_id: string
          isbn_13: string
          status: ReadingStatus
          rating: number | null
          review: string | null
          started_at: string | null
          finished_at: string | null
          is_private: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['reading_entries']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['reading_entries']['Insert']>
      }
      lists: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          is_public: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['lists']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['lists']['Insert']>
      }
      list_books: {
        Row: {
          list_id: string
          isbn_13: string
          position: number
          added_at: string
        }
        Insert: Omit<Database['public']['Tables']['list_books']['Row'], 'added_at'>
        Update: Partial<Database['public']['Tables']['list_books']['Insert']>
      }
      follows: {
        Row: {
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['follows']['Row'], 'created_at'>
        Update: never
      }
    }
  }
}
