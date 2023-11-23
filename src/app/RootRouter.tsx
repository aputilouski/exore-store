import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { SignInPage } from '@views/auth';
import { ProductsPage, CreateProductPage, ProductPage, EditProductPage } from '@views/products';

import { AuthGuard, MainLayout } from './components';

import router from '@router';

const publicRoutes: React.ComponentProps<typeof Route>[] = [
  {
    component: SignInPage,
    path: router.path.signIn,
  },
];

const privateRoutes: React.ComponentProps<typeof Route>[] = [
  {
    component: CreateProductPage,
    path: router.path.createProduct,
  },
  {
    component: EditProductPage,
    path: router.path.editProduct,
  },
  {
    component: ProductPage,
    path: router.path.product,
  },
  {
    component: ProductsPage,
    path: router.path.products,
  },
];

const RootRouter: React.FC = () => (
  <Router history={router.history}>
    <Switch>
      {publicRoutes.map(props => (
        <Route key={props.path as string} {...props} />
      ))}

      <Route>
        <AuthGuard>
          <MainLayout>
            <Switch>
              {privateRoutes.map(props => (
                <Route key={props.path as string} {...props} />
              ))}
              <Redirect to={router.path.products} />
            </Switch>
          </MainLayout>
        </AuthGuard>
      </Route>
    </Switch>
  </Router>
);

export default RootRouter;
