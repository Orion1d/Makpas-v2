export interface TranslationsTable {
  Row: {
    id: number
    key: string
    en: string
    tr: string
    created_at: string | null
    updated_at: string | null
  }
  Insert: {
    id?: never
    key: string
    en: string
    tr: string
    created_at?: string | null
    updated_at?: string | null
  }
  Update: {
    id?: never
    key?: string
    en?: string
    tr?: string
    created_at?: string | null
    updated_at?: string | null
  }
  Relationships: []
}