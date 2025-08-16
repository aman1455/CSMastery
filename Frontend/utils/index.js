
import axios from "axios";
import store from "../store";
import { setCredentials, logout } from "../features/userSlice.js";

 const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: `http://localhost:8080`
});

// Request interceptor: attach access token
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState()?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// // Response interceptor: handle token refresh
// axiosInstance.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const res = await axios.post(
//           "/api/v1/auth/refreshAccessToken",
//           {},
//           { withCredentials: true }
//         );
//         store.dispatch(setCredentials({ accessToken: res.data.accessToken }));
//         originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
//         return axiosInstance(originalRequest);
//       } catch (err) {
//         store.dispatch(logout());
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
