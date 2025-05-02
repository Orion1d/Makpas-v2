
export interface Product {
  id: number;
  name: string;
  name_tr?: string;
  description?: string;
  description_tr?: string;
  photo_url?: string;
  Product_Group?: string;
  Product_Group_tr?: string;
  price?: number;
  on_sale?: boolean;
}
