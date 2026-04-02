import axiosInstance from "./axios.instance";

class ApiClient {
  async fetchAllProducts({
    limit,
    skip,
    search,
    category,
  }: {
    limit: number;
    skip: number;
    search?: string;
    category?: string;
  }) {
    const params = new URLSearchParams();
    params.append("limit", limit.toString());
    params.append("skip", skip.toString());

    let url = "/products";
    if (search) {
      params.append("q", search);
      url = "/products/search";
    } else if (category) {
      url = `/products/category/${category}`;
    }

    const response = await axiosInstance.get(url, { params });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }

  async fetchProductById(id: string) {
    const response = await axiosInstance.get(`/products/${id}`);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message || "Failed to fetch product");
  }

  async fetchProductCategories() {
    const response = await axiosInstance.get(`/products/category-list`);

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(
      response.data.message || "Failed to fetch product categories",
    );
  }
}

const apiClient = new ApiClient();

export default apiClient;
