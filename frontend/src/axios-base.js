import axios from 'axios';
import LocalStorageService from './shared/LocalStorageService';
import { current_user } from './shared/utility';


const instance = axios.create({
    baseURL: "http://192.168.0.104:5000",
});

instance.interceptors.request.use(
    config => {
        const token = current_user.access_token;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

instance.interceptors.response.use((response) => response,
    error => {
        const originalRequest = error.config;
        const storage = LocalStorageService.get_service();
        const refresh_token = storage.get_refresh_token();
        if (error.response && error.response.status === 403 && !originalRequest._retry && refresh_token) {
            originalRequest._retry = true;
            instance.defaults.headers.common['Authorization'] = `Bearer ${refresh_token}`;
            current_user.access_token = "";
            return instance.post('/token/refresh')
                .then(res => {
                    if (res.status === 201) {
                        current_user.access_token = res.data.access_token;
                        current_user.name = res.data.user.name;
                        current_user.username = res.data.user.username;
                        current_user.role = res.data.user.role;
                        current_user.id = res.data.user.id;
                        instance.defaults.headers.common['Authorization'] =`Bearer ${current_user.access_token}`
                    }
                    return instance(originalRequest);
                }).catch(error =>  Promise.reject(error))
        }

        return Promise.reject(error);
    }
)
export default instance;