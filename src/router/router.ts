import history from './router-history';

const path = {
  signIn: '/sign-in',
  products: '/products',
  product: '/products/:id',
  forProduct: (id: string | number) => '/products/' + id,
  createProduct: '/products/create',
  editProduct: '/products/:id/edit',
  forEditProduct: (id: string | number) => `/products/${id}/edit`,
};

const router = {
  path,
  history,
  push: history.push,
  replace: history.replace,
  goBack: history.goBack,
};

export default router;
