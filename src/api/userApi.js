// // src/api/userApi.js
// import axios from "axios";

// // ប្រើ 127.0.0.1 ជំនួស localhost
// const API_BASE = "http://127.0.0.1:3000/api";

// const userApi = axios.create({
//   baseURL: API_BASE,
//   timeout: 15000,
// });

// // Debug interceptor
// userApi.interceptors.request.use(
//   (config) => {
//     console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   },
// );

// userApi.interceptors.response.use(
//   (response) => {
//     console.log(`📥 ${response.config.url} - ${response.status}`);
//     return response;
//   },
//   (error) => {
//     console.error(`❌ ${error.config?.url} - ${error.message}`);
//     return Promise.reject(error);
//   },
// );

// export const publicAPI = {
//   getPosts: (page = 1, limit = 9, category = "") => {
//     let url = `/posts?page=${page}&limit=${limit}`;
//     if (category) {
//       url += `&category=${category}`;
//     }
//     return userApi.get(url);
//   },
//   getPostById: (id) => userApi.get(`/posts/${id}`),
//   getRecentPosts: (limit = 5) => userApi.get(`/posts/recent?limit=${limit}`),
//   getPopularPosts: (limit = 5) => userApi.get(`/posts/popular?limit=${limit}`),
//   getCategories: () => userApi.get("/categories"),
//   searchPosts: (query, page = 1) =>
//     userApi.get(`/search?q=${query}&page=${page}`),
// };

// export default userApi;

import axios from "axios";

// const API_BASE = "http://127.0.0.1:3000/api";

// const userApi = axios.create({
//   baseURL: API_BASE,
//   timeout: 15000,
// });

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
  // Posts
  getPosts: (page = 1, limit = 9, category = "") => {
    let url = `/posts?page=${page}&limit=${limit}`;
    if (category) {
      url += `&category=${category}`;
    }
    return userApi.get(url);
  },
  getPostById: (id) => userApi.get(`/posts/${id}`),
  getRecentPosts: (limit = 5) => userApi.get(`/posts/recent?limit=${limit}`),
  getPopularPosts: (limit = 5) => userApi.get(`/posts/popular?limit=${limit}`),

  // Categories
  getCategories: () => userApi.get("/categories"),

  // Search
  searchPosts: (query, page = 1) =>
    userApi.get(`/search?q=${query}&page=${page}`),

  // Comments
  addComment: (data) => userApi.post("/comments", data),
  getComments: (postId) => userApi.get(`/comments/${postId}`),

  // Track View
  trackView: (postId) => userApi.post("/track-view", { post_id: postId }),
};

export default userApi;
