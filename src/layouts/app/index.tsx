import { AppHeader } from "components/header";
import { CartProvider } from "pages/cart/store/cart.context";
import { FunctionComponent } from "react";
import { ToastContainer } from "react-toastify";

// Any Global functionality, or behavior across the app can be handled here

export const App: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <CartProvider>
      <AppHeader />
      <>{children}</>
      <ToastContainer />
    </CartProvider>
  </>
);
