import { ProductsResponse } from "pages/api/products/types";
import { toast } from "react-toastify";
import { endPoints } from "src/config/endpoints";
import { httpService } from "src/services/http";

interface GetProductsParams {
  page: number;
}

export const getProducts = async ({ page }: GetProductsParams) => {
  try {
    const response: ProductsResponse = await httpService.get(endPoints.products, { page });
    return response;
  } catch (e) {
    console.error(e);
    toast("Could not fetch prodcuts. Please try again later", { type: "error" }); // for simplicity we keep message hardcoded
  }
};
