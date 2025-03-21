import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
});

// 요청 인터셉터 추가: 모든 요청에 JWT 포함
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // FormData가 아닌 경우에만 Content-Type 설정
    if (!(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
