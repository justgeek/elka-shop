import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import HomePage from "..";
import "src/__mocks__/main.mock";
import "pages/cart/__mocks__/cart.mock";
import "pages/products/__mocks__/products.mock";

// Rendering
describe("rendering", () => {
  it("should render Home Page", async () => {
    await act(async () => {
      const { container } = render(<HomePage />);
      expect(container).toBeDefined;
    });
  });
});
