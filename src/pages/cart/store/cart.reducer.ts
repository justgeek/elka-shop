import { Product } from "pages/api/products/types";

// this should be defined in a global place though
export interface Action {
  type: string;
  payload?: any;
}

export interface CartState {
  totalCartValue: number;
  totalCartItemsCount: number;
  cart: {
    [gtin: string]: {
      count: number;
      product: Product;
    };
  };
}

export const CART_ACTIONS = {
  ADD_TO_CART: "add-to-cart",
  REMOVE_FROM_CART: "remove-from-cart",
  INCREMENT_PRODUCT_CART_COUNT: "increment-product-cart-count",
  DECREMENT_PRODUCT_CART_COUNT: "decrement-product-cart-count",
};

export const cartReducer = (state: CartState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const { gtin, recommendedRetailPrice } = payload;
      if (state.cart[gtin]) {
        state.cart[gtin].count++;
      } else {
        state.cart[gtin] = { count: 1, product: payload };
      }
      state.totalCartValue += recommendedRetailPrice;
      state.totalCartItemsCount++;
      return { ...state };
    }
    case CART_ACTIONS.REMOVE_FROM_CART: {
      const { gtin, recommendedRetailPrice } = payload;
      const count = state.cart[gtin].count;
      state.totalCartItemsCount -= count;
      state.totalCartValue -= count * recommendedRetailPrice;
      delete state.cart[gtin];
      return { ...state };
    }
    case CART_ACTIONS.INCREMENT_PRODUCT_CART_COUNT: {
      const { gtin, recommendedRetailPrice } = payload;
      state.cart[gtin].count++;
      state.totalCartItemsCount += 1;
      state.totalCartValue += recommendedRetailPrice;
      return { ...state };
    }
    case CART_ACTIONS.DECREMENT_PRODUCT_CART_COUNT: {
      const { gtin, recommendedRetailPrice } = payload;
      state.cart[gtin].count--;
      state.totalCartItemsCount -= 1;
      state.totalCartValue -= recommendedRetailPrice;
      return { ...state };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};
