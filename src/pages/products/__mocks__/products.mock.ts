export const getProducts = jest.spyOn(require("pages/products/products.service"), "getProducts");
getProducts.mockResolvedValue({ count: 2, results: [], page: 1 });
