import { fireEvent, render, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { ProductsPage } from "..";
import "src/__mocks__/main.mock";
import "pages/cart/__mocks__/cart.mock";
import { getProducts } from "pages/products/__mocks__/products.mock";
import { dispatch } from "pages/cart/__mocks__/cart.mock";
import { CART_ACTIONS } from "pages/cart/store/cart.reducer";

describe("Products Page", () => {
  // Rendering
  describe("rendering", () => {
    it("should render Products Page", async () => {
      await act(async () => {
        const { container } = render(<ProductsPage />);
        expect(container).toBeDefined;
      });
    });

    it("should render Paginator if pages are more than 1", async () => {
      getProducts.mockResolvedValueOnce({ count: 40, results: [], page: 1 });
      const { container } = render(<ProductsPage />);
      await act(async () => {
        await waitFor(() => {
          const paginator = container.querySelector("paginator-bar");
          expect(paginator).toBeInTheDocument();
        });
      });
    });

    it("should not render Paginator if pages are less than 1", async () => {
      getProducts.mockResolvedValueOnce({ count: 20, results: [], page: 1 });
      const { container } = render(<ProductsPage />);
      await act(async () => {
        await waitFor(() => {
          const paginator = container.querySelector("paginator-bar");
          expect(paginator).not.toBeInTheDocument();
        });
      });
    });
  });

  // Flow
  describe("Flow", () => {
    it("should get products on mount", async () => {
      await act(async () => {
        render(<ProductsPage />);
        expect(getProducts).toBeCalledWith({ page: 1 });
      });
    });

    it("should get call ellipsifyText on product name and return same length if less than 45 chars", async () => {
      const NORMAL_NAME = "some name";
      getProducts.mockResolvedValueOnce({ count: 20, results: [{ name: NORMAL_NAME }], page: 1 });
      await act(async () => {
        const { container } = render(<ProductsPage />);
        await waitFor(() => {
          const title = container.querySelector(".prod-title");
          expect(title?.textContent?.length).toBe(NORMAL_NAME.length);
        });
      });
    });

    it("should get call ellipsifyText on product name and return clipped length if more than 45 chars", async () => {
      const LONG_NAME = "some very long name jM5cxPHRMkw2ni0tggL9Nfok8wnUT1kehxmphJrFFqvIY6us00";
      const CLIPPED_LENGTH = 48; // 45 + "..."
      getProducts.mockResolvedValueOnce({ count: 20, results: [{ name: LONG_NAME }], page: 1 });
      await act(async () => {
        const { container } = render(<ProductsPage />);
        await waitFor(() => {
          const title = container.querySelector(".prod-title");
          expect(title?.textContent?.length).toBe(CLIPPED_LENGTH);
        });
      });
    });
  });

  // Methods
  describe("Methods", () => {
    it("should addProductToCart when button is clicked", async () => {
      getProducts.mockResolvedValueOnce({ count: 20, results: [{ name: "Some Name" }], page: 1 });
      await act(async () => {
        const { container } = render(<ProductsPage />);
        await waitFor(() => {
          const addToCartButton = container.querySelector(".prod-info button");
          fireEvent.click(addToCartButton!);
          expect(dispatch).toBeCalledWith({ type: CART_ACTIONS.ADD_TO_CART, payload: { name: "Some Name" } });
        });
      });
    });
  });
});
