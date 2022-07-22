import { EmptyState } from "components/empty-state";
import { Page } from "layouts/page";
import router from "next/router";
import { Product } from "pages/api/products/types";
import { useCart } from "pages/cart/store/cart.context";
import { toast } from "react-toastify";
import { CART_ACTIONS } from "./store/cart.reducer";

const CartPage = () => {
  const title = "My Cart";
  const CART_SUBTOTAL = "Subtotal";
  const CART_CTA_CHECKOUT = "Checkout";
  const CART_CTA_GO_SHOPPING = "Continue Shopping";
  const EMPTY_CART_MESSAGE = "Your cart is empty!";
  const PRODUCT_REMOVED_FROM_CART = "The product was removed from your cart";
  const {
    state: { totalCartValue, totalCartItemsCount, cart },
    dispatch,
  } = useCart()!;

  const goToShop = () => {
    router.push("/");
  };

  const removeProductFromCart = (product: Product) => {
    const confirmMessage = "Do you really want to remove this item from cart?";
    if (confirm(confirmMessage)) {
      dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: product });
      toast(PRODUCT_REMOVED_FROM_CART, { type: "success" });
    }
  };

  const decrementProductCountInCart = (product: Product) => {
    dispatch({ type: CART_ACTIONS.DECREMENT_PRODUCT_CART_COUNT, payload: product });
  };

  const incrementProductCountInCart = (product: Product) => {
    dispatch({ type: CART_ACTIONS.INCREMENT_PRODUCT_CART_COUNT, payload: product });
  };

  return (
    <Page title={title}>
      {totalCartItemsCount > 0 && (
        <non-empty-cart>
          <div className="flex h-full flex-col md:flex-row">
            <div className="flex-grow bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h1 className="text-lg font-medium text-gray-900"> Shopping cart </h1>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {Object.values(cart).map(({ product }) => {
                        const { gtin } = product;
                        return (
                          <li key={product.gtin} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover object-center" />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{product.name}</h3>
                                  <p className="ml-4">
                                    {parseFloat((cart[gtin].count * product.recommendedRetailPrice).toFixed(2)) +
                                      " " +
                                      product.recommendedRetailPriceCurrency}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex">
                                  <button
                                    onClick={() => {
                                      decrementProductCountInCart(product);
                                    }}
                                    className="mr-6 w-8 h-8 bg-primary border-transparent rounded-md flex items-center justify-center text-base font-medium text-white hover:opacity-75"
                                    disabled={cart[gtin].count == 1}>
                                    -
                                  </button>
                                  <p className="text-gray-500 flex items-center font-bold">Qty: {cart[gtin].count}</p>
                                  <button
                                    onClick={() => {
                                      incrementProductCountInCart(product);
                                    }}
                                    className="ml-6 w-8 h-8 bg-primary border-transparent rounded-md  flex items-center justify-center text-base font-medium text-white hover:opacity-75">
                                    +
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    onClick={() => {
                                      removeProductFromCart(product);
                                    }}
                                    type="button"
                                    className="font-medium text-primary hover:opacity-75">
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 md:border-none py-6 md:pt-6 md:pr-0 px-4 sm:px-6 h-60 sticky top-16 z-50">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>{CART_SUBTOTAL}</p>
                <p>{parseFloat(totalCartValue.toFixed(2)) + " EUR"}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <a
                  href="#"
                  className="flex items-center justify-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-75">
                  {CART_CTA_CHECKOUT}
                </a>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button onClick={goToShop} type="button" className="font-medium text-primary hover:opacity-75">
                    {CART_CTA_GO_SHOPPING}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </non-empty-cart>
      )}
      {totalCartItemsCount == 0 && (
        <empty-cart>
          <EmptyState
            artWorkPath={"/assets/sad-bag.svg"}
            message={EMPTY_CART_MESSAGE}
            cta={{
              message: CART_CTA_GO_SHOPPING,
              action: () => {
                goToShop();
              },
            }}
          />
        </empty-cart>
      )}
    </Page>
  );
};

export default CartPage;
