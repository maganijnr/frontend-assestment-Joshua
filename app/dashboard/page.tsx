"use client";
import MaxWidthWrapper from "@/components/molecules/max-width-wrapper";
import PageLoader from "@/components/molecules/page-loader";
import ProductList from "@/components/organisms/product-list";
import apiClient from "@/lib/api.client";
import { Product } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Button from "@/components/atom/button";

import FilterSheet from "@/components/organisms/filter-sheet";
import Input from "@/components/atom/input";

function DashboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const search = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";

  const [searchInput, setSearchInput] = useState(search);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput !== search) {
        const params = new URLSearchParams(searchParams.toString());
        if (searchInput) {
          params.set("q", searchInput);
          params.delete("category");
        } else {
          params.delete("q");
        }
        params.set("skip", "0");
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchInput, search, searchParams, pathname, router]);

  const limit = 20;

  const { isLoading, data, isRefetching } = useQuery({
    queryKey: ["fetch-all-products", skip, search, category],
    queryFn: async () => {
      const response = await apiClient.fetchAllProducts({
        limit: limit,
        skip: skip,
        search: search,
        category: category,
      });
      return response;
    },
    retry: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["fetch-product-categories"],
    queryFn: async () => {
      const response = await apiClient.fetchProductCategories();
      return response;
    },
    retry: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const productList: Product[] = data?.products ?? [];
  const total: number = data?.total ?? 0;

  const updateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput) {
      params.set("q", searchInput);
      params.delete("category");
    } else {
      params.delete("q");
    }
    params.set("skip", "0");
    router.push(`${pathname}?${params.toString()}`);
  };

  const updateCategory = (newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory) {
      params.set("category", newCategory);
      params.delete("q"); // Search and category may conflict, clear search
      setSearchInput("");
    } else {
      params.delete("category");
    }
    params.set("skip", "0");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleNext = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("skip", (skip + limit).toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePrev = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("skip", Math.max(0, skip - limit).toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <MaxWidthWrapper className="py-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold whitespace-nowrap">Products</h1>

          <div className="flex w-full md:max-w-md gap-2 justify-end">
            <form onSubmit={updateSearch} className="flex flex-1 gap-2 w-full">
              <Input
                value={searchInput}
                setValue={setSearchInput}
                placeholder="Search products..."
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit">Search</Button>
            </form>
            <Button
              type="button"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                  clipRule="evenodd"
                />
              </svg>
              Filter
            </Button>
          </div>
        </div>

        {category && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm text-gray-500">Active Filter:</span>
            <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full capitalize font-medium">
              {category.replace("-", " ")}
            </span>
            <button
              onClick={() => updateCategory("")}
              className="text-gray-400 hover:text-red-500 transition-colors"
              title="Clear Filter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        <ProductList
          products={productList}
          isLoading={isLoading || isRefetching}
        />

        {!isLoading && total > 0 && (
          <div className="flex justify-between items-center mt-8 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
            <Button onClick={handlePrev} disabled={skip === 0}>
              Previous
            </Button>
            <span className="text-sm text-gray-600 font-medium">
              Showing {skip + 1} to {Math.min(skip + limit, total)} of {total}
            </span>
            <Button onClick={handleNext} disabled={skip + limit >= total}>
              Next
            </Button>
          </div>
        )}

        <FilterSheet
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          categories={categories || []}
          selectedCategory={category}
          onSelectCategory={updateCategory}
          isLoading={categoriesLoading}
        />
      </MaxWidthWrapper>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<PageLoader />}>
      <DashboardPage />
    </Suspense>
  );
}
