import { Product } from "@/lib/types";
import Card from "../molecules/card";
import ProductCardSkeleton from "../molecules/product-card-skeleton";
import { Box } from "iconsax-reactjs";

function ProductList({
  products,
  isLoading,
}: {
  products: Product[];
  isLoading: boolean;
}) {
  return (
    <>
      {!isLoading && products.length === 0 && (
        <div className="flex flex-col gap-4 items-center justify-center h-64">
          <Box size={100} color="#9CA3AF" />
          <p className="text-gray-500">No products found</p>
        </div>
      )}

      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
        </div>
      )}

      {!isLoading && products.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product?.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}

export default ProductList;
