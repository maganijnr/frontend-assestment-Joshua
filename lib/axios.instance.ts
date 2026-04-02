import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

//AXIOS configure
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     const token = process.env.NEXT_PUBLIC_MOVIEDB_TOKEN;
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error: AxiosError) => {
//     return Promise.reject(error);
//   },
// );

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      const data = error.response.data as { status_message?: string };
      errorMessage = data?.status_message || `Error: ${error.response.status}`;
    } else if (error.request) {
      errorMessage =
        "No response received from the server. Please check your network connection.";
    } else {
      errorMessage = error.message;
    }

    return Promise.reject({
      ...error,
      message: errorMessage,
    });
  },
);

export default axiosInstance;
