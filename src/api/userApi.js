// api/userApi.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:3000/api";

const userApi = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
});

// Debug interceptor
userApi.interceptors.request.use(
  (config) => {
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

userApi.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`❌ ${error.config?.url} - ${error.message}`);
    return Promise.reject(error);
  },
);

export const publicAPI = {
  // ✅ Use /posts endpoint (which is working)
  getPosts: (page = 1, limit = 9, category = "") => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (
      category &&
      category !== "undefined" &&
      category !== "null" &&
      category !== ""
    ) {
      url += `&category=${category}`;
      console.log(`🔍 Filtering by category: ${category}`);
    }
    return userApi.get(url);
  },

  getPostById: (id) => userApi.get(`/posts/${id}`),

  getRecentPosts: (limit = 5) => userApi.get(`/posts/recent?limit=${limit}`),

  getPopularPosts: (limit = 5) => userApi.get(`/posts/popular?limit=${limit}`),

  // ✅ Use /categories endpoint (which is working)
  getCategories: () => userApi.get("/categories"),

  searchPosts: (query, page = 1) =>
    userApi.get(`/search?q=${query}&page=${page}`),

  addComment: (data) => userApi.post("/comments", data),

  getComments: (postId) => userApi.get(`/comments/${postId}`),

  trackView: (postId) => userApi.post("/track-view", { post_id: postId }),
};

export default userApi;
