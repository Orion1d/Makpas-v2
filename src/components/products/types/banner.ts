
export interface Banner {
  id: number;
  name: string | null;
  photo_url: string | null;
  created_at: string;
}

export interface ProductBannerProps {
  banners?: Banner[];
}
