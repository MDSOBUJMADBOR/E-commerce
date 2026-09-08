
export interface Product {
  _id?: string;
  name?: string;
  price?: number;
  image?: string;
  images?: string[];

  
  color?: string | string[];
}

export interface CartItem {
  _id: string;

  product?: Product;

  productId?: string;

  name?: string;
  price?: number;

  image?: string;
  images?: string[];

  color?: string | string[];

  quantity: number;

  userName?: string;
  userEmail?: string;
}