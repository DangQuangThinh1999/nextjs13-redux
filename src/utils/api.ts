import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/";
let authToken: string | "";

// Create a custom Axios instance with default configuration
const api: AxiosInstance = axios.create({
  baseURL,
});

// Set authentication token
export function setAuthToken(token: string | "") {
  authToken = token;
}
api.defaults.timeout = 25000; //1000 = 1s
// Add request interceptor to add authentication header
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  }
);

// Add response interceptor to handle responses globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    // Handle error responses
    return Promise.reject(error);
  }
);

export default api;
