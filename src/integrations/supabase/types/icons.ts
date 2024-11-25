export interface IconsTable {
  Row: {
    id: number
    name: string
    photo_url: string | null
  }
  Insert: {
    id?: never
    name: string
    photo_url?: string | null
  }
  Update: {
    id?: never
    name?: string
    photo_url?: string | null
  }
  Relationships: []
}