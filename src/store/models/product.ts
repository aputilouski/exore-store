export interface Product {
  id: number | string;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface UserProduct extends Product {
  published: boolean;
}
