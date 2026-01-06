// import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// const api: AxiosInstance = axios.create({
//   baseURL: process.env.API_URL,
//   timeout: 10000, // 10s timeout
// });

// // Interceptor tự động thêm token vào header Authorization
// api.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const token = getToken();
//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//       };
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
