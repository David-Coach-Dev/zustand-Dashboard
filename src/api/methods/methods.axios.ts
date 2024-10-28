import axios from "axios";
import { useAuthStore } from "../../stores";

const methodsApi = axios.create({
  baseURL:"http://localhost:3000/api",
});

methodsApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().getAuthToken();
    console.log('Token: ', token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config
  }
);

export {
  //methods
  methodsApi
}
