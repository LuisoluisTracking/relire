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
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          onboarding_completed?: boolean
          favorite_genres?: string[]
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          onboarding_completed?: boolean
          favorite_genres?: string[]
        }
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
        Insert: {
          isbn_13: string
          google_id?: string | null
          title: string
          subtitle?: string | null
          authors?: string[] | null
          published_date?: string | null
          description?: string | null
          page_count?: number | null
          language?: string | null
          categories?: string[] | null
          cover_url?: string | null
        }
        Update: {
          isbn_13?: string
          google_id?: string | null
          title?: string
          subtitle?: string | null
          authors?: string[] | null
          published_date?: string | null
          description?: string | null
          page_count?: number | null
          language?: string | null
          categories?: string[] | null
          cover_url?: string | null
        }
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
        Insert: {
          id?: string
          user_id: string
          isbn_13: string
          status: ReadingStatus
          rating?: number | null
          review?: string | null
          started_at?: string | null
          finished_at?: string | null
          is_private?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          isbn_13?: string
          status?: ReadingStatus
          rating?: number | null
          review?: string | null
          started_at?: string | null
          finished_at?: string | null
          is_private?: boolean
        }
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
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          is_public?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          is_public?: boolean
        }
      }
      list_books: {
        Row: {
          list_id: string
          isbn_13: string
          position: number
          added_at: string
        }
        Insert: {
          list_id: string
          isbn_13: string
          position: number
        }
        Update: {
          list_id?: string
          isbn_13?: string
          position?: number
        }
      }
      follows: {
        Row: {
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          follower_id: string
          following_id: string
        }
        Update: never
      }
    }
  }
}
