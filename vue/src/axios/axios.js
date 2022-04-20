import axios from "axios";
import store from "@/store";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosClient.interceptors.request.use(
  (config) => {
    // config.headers.common["X-Requested-With"] = "XMLHttpRequest";
    // config.headers.common["content-type"] = "multipart/form-data";
    // config.headers.common["accept"] = "application/json";
    // config.headers.common["Authorization"] = `Bearer ${store.state.user.token}`;
    return config;
  },

  (error) => {
    console.log("err", error);
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
