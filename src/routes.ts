import { ProductsPage } from "pages/products";

export interface AppRoute {
  path: string;
  title?: string;
  navigationLabel?: string;
  name: string;
  children?: AppRoute[];
}

export interface AppRoutes {
  [key: string]: AppRoute;
}

export const ROUTES: AppRoutes = {
  products: { path: "/", name: "products", navigationLabel: "Shop" },
  cart: { path: "/cart", name: "cart", title: "My cart", navigationLabel: "My Cart" },
};

export const HomeRoute = ProductsPage;
