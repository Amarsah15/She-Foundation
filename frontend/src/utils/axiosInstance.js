import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://she-foundation.onrender.com/api/v1/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
