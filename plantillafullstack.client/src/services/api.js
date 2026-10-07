import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor: Antes de enviar cualquier petici�n, adjunta el Token si existe
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // Buscamos el token guardado
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;