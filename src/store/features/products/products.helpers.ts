import { UserProduct } from '../../models';

const sleep = (ms: number = 600) => new Promise(resolve => setTimeout(resolve, ms));

export const userProductService = {
  async getProducts(): Promise<UserProduct[]> {
    await sleep();
    return JSON.parse(localStorage.getItem('products') || '[]');
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
