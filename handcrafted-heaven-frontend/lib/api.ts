import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Log outgoing request
api.interceptors.request.use((config) => {
  console.log("Outgoing request config:");
  console.log("URL:", config.url);
  console.log("Method:", config.method);
  console.log("withCredentials:", config.withCredentials);
  console.log("Headers:", config.headers);

  // If cookies are accessible, they’ll be sent automatically
  return config;
});

export default api;
