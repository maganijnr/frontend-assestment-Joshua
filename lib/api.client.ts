import axiosInstance from "./axios.instance";

class ApiClient {
  async getMovielist(payload: { search: string; page: number; limit: number }) {
    const response = await axiosInstance.get(`/list`, { params: payload });

    if (response.status === 200 || response.status === 201) {
      return response.data;
    }

    throw new Error(response.data.message);
  }
}

const apiClient = new ApiClient();

export default apiClient;
