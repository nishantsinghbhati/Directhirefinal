// src/lib/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  // ✅ DO NOT set 'Content-Type' here
});
// src/lib/api.js


export default instance;
