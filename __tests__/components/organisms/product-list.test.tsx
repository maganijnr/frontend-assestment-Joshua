import { render, screen } from "@testing-library/react";
import ProductList from "@/components/organisms/product-list";

// Mock child components to simplify testing
jest.mock("@/components/molecules/card", () => {
  return function DummyCard({ product }: any) {
    return <div data-testid="product-card">{product.title}</div>;
  };
});

jest.mock("@/components/molecules/product-card-skeleton", () => {
  return function DummySkeleton() {
    return <div data-testid="product-skeleton">Loading</div>;
  };
});

describe("ProductList component", () => {
  it("renders skeletons when isLoading is true", () => {
    render(<ProductList products={[]} isLoading={true} />);
    const skeletons = screen.getAllByTestId("product-skeleton");
    expect(skeletons.length).toBe(20);
  });

  it("renders empty state when not loading and no products", () => {
    render(<ProductList products={[]} isLoading={false} />);
    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  it("renders product cards when not loading and products are available", () => {
    const mockProducts = [
      { id: 1, title: "Product A" },
      { id: 2, title: "Product B" },
    ] as any;

    render(<ProductList products={mockProducts} isLoading={false} />);

    const cards = screen.getAllByTestId("product-card");
    expect(cards.length).toBe(2);
    expect(screen.getByText("Product A")).toBeInTheDocument();
  });
});
