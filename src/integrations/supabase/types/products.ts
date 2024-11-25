export interface ProductsTable {
  Row: {
    created_at: string | null
    description: string | null
    id: number
    name: string
    photo_url: string | null
    product_group: string | null
    Product_Group: string | null
    updated_at: string | null
  }
  Insert: {
    created_at?: string | null
    description?: string | null
    id?: never
    name: string
    photo_url?: string | null
    product_group?: string | null
    Product_Group?: string | null
    updated_at?: string | null
  }
  Update: {
    created_at?: string | null
    description?: string | null
    id?: never
    name?: string
    photo_url?: string | null
    product_group?: string | null
    Product_Group?: string | null
    updated_at?: string | null
  }
  Relationships: []
}