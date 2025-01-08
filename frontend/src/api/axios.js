import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8000/", 
    withCredentials: true,
});

// Interceptor to automatically add CSRF token and authorization token
api.interceptors.request.use((config) => {
    // Add the CSRF token from the cookies to the header
    const csrfToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("XSRF-TOKEN="))
        ?.split("=")[1];
    if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = decodeURIComponent(csrfToken);
    }

    // Add the authorization token from localStorage
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
});

export default api;
