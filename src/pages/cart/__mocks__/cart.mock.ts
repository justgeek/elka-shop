export const useCart = jest.spyOn(require("pages/cart/store/cart.context"), "useCart");
export const dispatch = jest.fn();
useCart.mockReturnValue({ dispatch });
