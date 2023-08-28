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
// api.defaults.timeout = 1000; //1000 = 1s
// Add request interceptor to add authentication header
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    return config;
  }
);
export function delete_cookie(name: string) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
export function hasCookie(cookieName: string) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name] = cookie.split("=");
    if (name === cookieName) {
      return true;
    }
  }
  return false; // Cookie not found
}
// Add response interceptor to handle responses globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: any) => {
    delete_cookie("access_token");
    // Handle error responses
    return Promise.reject(error);
  }
);

export default api;
