import { UserProduct } from '@store/models';

const sleep = (ms: number = 600) => new Promise(resolve => setTimeout(resolve, ms));

type GetProductsParams = { published?: boolean };

export const userProductService = {
  async getProducts({ published }: GetProductsParams = {}): Promise<UserProduct[]> {
    await sleep();
    const products: UserProduct[] = JSON.parse(localStorage.getItem('products') || '[]');

    // sort by published
    if (typeof published === 'boolean')
      return products.sort((a, b) => (published ? 1 : -1) * (a.published && !b.published ? -1 : 1));

    return products;
  },

  async findProduct(productId: string | number): Promise<UserProduct | undefined> {
    const products = await this.getProducts();
    return products.find(p => p.id === productId);
  },

  async addProduct(product: UserProduct): Promise<void> {
    const products = await this.getProducts();
    localStorage.setItem('products', JSON.stringify([product, ...products]));
  },

  async deleteProduct(productId: string | number): Promise<void> {
    const products = await this.getProducts();
    localStorage.setItem('products', JSON.stringify(products.filter(p => p.id !== productId)));
  },

  async updateProduct(values: Partial<UserProduct>): Promise<void> {
    const products = await this.getProducts();
    const index = products.findIndex(p => p.id === values.id);
    Object.assign(products[index], values);
    localStorage.setItem('products', JSON.stringify(products));
  },
};
