import axios from "axios";
import LocalStorageService from "./shared/LocalStorageService";
import { token } from "./shared/utility";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const user_token = token.access_token;
    if (user_token) {
      config.headers["Authorization"] = `Bearer ${user_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    // if already send request to get refresh token  reject error
    // to prevent from infinite loop of sending refresh token
    if (
      error.response.status === 401 &&
      originalRequest.url === "/token/refresh"
    ) {
      return Promise.reject(error);
    }

    const storage = LocalStorageService.get_service();
    const refresh_token = storage.get_refresh_token();
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401) &&
      !originalRequest._retry &&
      refresh_token
    ) {
      originalRequest._retry = true;
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${refresh_token}`;
      token.access_token = "";
      return instance
        .post("/token/refresh")
        .then((res) => {
          if (res.status === 201) {
            token.access_token = res.data.access_token;
            instance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${token.access_token}`;
          }
          return instance(originalRequest);
        })
        .catch((error) => Promise.reject(error));
    }
    return Promise.reject(error);
  }
);
export default instance;
