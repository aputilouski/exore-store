import { Product } from '@store/models';

export type CreateProductParams = Pick<Product, 'title' | 'price' | 'description'> & {
  published: boolean;
};

export type CreateProductResponseData = Pick<CreateProductParams, 'title' | 'description' | 'price'> & {
  id: number;
};
