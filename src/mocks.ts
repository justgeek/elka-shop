const useRouter = jest.spyOn(require("next/router"), "useRouter");
const useCart = jest.spyOn(require("pages/cart/store/cart.context"), "useCart");
const getProducts = jest.spyOn(require("pages/products/products.service"), "getProducts");
const query = { page: 1 };
const router = { query, push: jest.fn() };
useRouter.mockReturnValue(router);
useCart.mockReturnValue({ dispatch: jest.fn() });
getProducts.mockResolvedValue({ count: 2, results: [], page: 1 });

export {};
