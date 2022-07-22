import { Paginator } from "components/paginator";
import { Page } from "layouts/page";
import { useRouter } from "next/router";
import { Product, ProductsResponse } from "pages/api/products/types";
import { useCart } from "pages/cart/store/cart.context";
import { CART_ACTIONS } from "pages/cart/store/cart.reducer";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts } from "./products.service";

export const ProductsPage = () => {
  // For simplicity statics live here, but usually they should live in data folder, or i18n translation files
  const PAGE_SUBTITLE = "Latest arrivals";
  const ADD_TO_CART = "Add to cart";
  const PRODUCT_ADDED_SUCCESSFULLY = "Product was added to your card";

  const RESULTS_PER_PAGE = 20;
  // for the sake of keeping the visual consistent, ellipsis will be applied after cound exceeds
  const MAX_TITLE_CHARACTERS = 45;
  const MAX_DESCRIPTION_CHARACTERS = 100;
  const INITIAL_PAGE_NUMBER = 1;

  const router = useRouter();
  const {
    query: { page },
  } = router;
  const [currentPage, setCurrentPage] = useState(parseInt(page as string) || INITIAL_PAGE_NUMBER);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    /* istanbul ignore else  */
    if (page) {
      setCurrentPage(page as unknown as number);
    }
  }, [page]);

  useEffect(() => {
    /* istanbul ignore else  */
    if (currentPage) {
      (async () => {
        const { count, results: products } = (await getProducts({ page: currentPage })) as ProductsResponse;
        /* istanbul ignore else  */
        if (!totalCount) {
          const totalPagesCount = Math.ceil(count / RESULTS_PER_PAGE);
          setTotalCount(count);
          setTotalPages(totalPagesCount);
        }

        setProducts(products);
        router.push(`/?page=${currentPage}`, undefined, { shallow: true });
      })();
    }
  }, [currentPage]);

  const ellipsifyText = (text: string, count: number) => {
    return text.length > count ? text.slice(0, count) + "..." : text;
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { dispatch } = useCart()!;

  const addProductToCart = (product: Product) => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product });
    toast(PRODUCT_ADDED_SUCCESSFULLY, { type: "success" });
  };

  return (
    <Page>
      <h2 className="text-xl font-extrabold tracking-tight text-gray-900">{PAGE_SUBTITLE}</h2>
      <products-list>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div className="flex justify-center items-center" key={product.gtin}>
              <div className="w-full p-4">
                <div className="card flex flex-col justify-center p-10 bg-white rounded-lg shadow-2xl">
                  <div className="prod-info-header">
                    <h2 className="prod-title text-xl uppercase text-gray-900 font-bold h-14 overflow-hidden break-all">
                      {ellipsifyText(product.name, MAX_TITLE_CHARACTERS)}
                    </h2>
                    <h3 className="font-bold mt-2 text-xs text-primary inline-block">{product.categoryName}</h3>
                    <p className="uppercase text-sm text-gray-400 mt-4 h-20 overflow-hidden break-all">
                      {ellipsifyText(product.name, MAX_DESCRIPTION_CHARACTERS)}
                    </p>
                    <span className="px-4 py-2 mb-6 text-xs rounded-full text-white bg-primary inline-block">{product.brandName}</span>
                  </div>
                  <div className="prod-img">
                    <img src={product.imageUrl} className="w-full object-cover object-center" />
                  </div>
                  <div className="prod-info grid gap-4">
                    <p className="font-bold text-xl text-center mt-4">
                      {product.recommendedRetailPrice + " " + product.recommendedRetailPriceCurrency}
                    </p>
                    <div className="flex flex-col md:flex-row justify-center items-center text-gray-900">
                      <button
                        onClick={() => {
                          addProductToCart(product);
                        }}
                        className="mt-1 px-6 py-2 transition ease-in duration-200 uppercase rounded-full hover:bg-primary hover:text-white border-2 border-gray-900 focus:outline-none">
                        {ADD_TO_CART}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </products-list>
      {totalPages > 1 && (
        <paginator-bar>
          <Paginator
            totalCount={totalCount}
            resultsPerPage={RESULTS_PER_PAGE}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </paginator-bar>
      )}
    </Page>
  );
};
