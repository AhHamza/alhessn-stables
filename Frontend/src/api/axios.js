import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
//An interceptor runs automatically before every request.
//  So instead of manually adding the token to every API call, we set it
// up once here and it attaches to every request automatically.

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("alhessn_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
