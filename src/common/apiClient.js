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

// //토큰 만료 시 수행할 로직 
// api.interceptors.response.use(
//     response => response,
//     async error => {
//       if (error.response?.status === 401) {
//         await refreshAccessToken(); // 401 응답 시 자동으로 토큰 갱신
//         return api(error.config); // 원래 요청 재시도
//       }
//       return Promise.reject(error);
//     }
//   );

export default apiClient;
