import React, { createContext, Dispatch, FunctionComponent, useReducer } from "react";
import { CartState, Action, cartReducer } from "./cart.reducer";

const CartContext = createContext<{ state: CartState; dispatch: Dispatch<Action> } | undefined>(undefined);

export const CartProvider: FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const initialState = { totalCartValue: 0, totalCartItemsCount: 0, cart: {} };
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const value = { state, dispatch };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  return context;
};
