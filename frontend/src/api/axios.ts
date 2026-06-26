    import axios from "axios";

    const api = axios.create({
        baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
        withCredentials: true,
    })

    let currentAccessToken : string | null = null;

    export const setAccessToken = (token: string | null) => {
        currentAccessToken = token;
    };

    api.interceptors.request.use((config) => {
        if (currentAccessToken) {
            config.headers.Authorization = `Bearer ${currentAccessToken}`;
        } else {
            delete config.headers.Authorization;
        }
        return config;
    })

    api.interceptors.response.use((response) => response, async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data } = await axios.post(
                    "http://localhost:3000/api/auth/refresh-token",
                    {},
                    { withCredentials: true}
                );

                const newAccessToken = data.accessToken;
                setAccessToken(newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return api(originalRequest);

            } catch (refreshError) {
                setAccessToken(null);
                return Promise.reject(refreshError);

            }
        }
        return Promise.reject(error);
    });

    export default api;