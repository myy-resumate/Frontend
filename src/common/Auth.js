import apiClient from "./apiClient";
import { jwtDecode } from "jwt-decode";

// 토큰 검사 함수
export const checkTokens = async () => {
    const accessToken = localStorage.getItem('accessToken');

    // 액세스 토큰이 있는 경우 - refresh토큰이 만료되었는지 체크 
    if (accessToken) {
        //액세스 토큰 만료 여부 확인
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000); // 현재 시간(초)

        // 액세스 토큰이 유효한 경우
        if (decodedToken.exp > currentTime) {
            return true;
        }

        // 액세스 토큰이 만료된 경우 
        // 쿠키에 있는 리프레쉬 토큰으로 토큰 재발급 api 요청
        try {
            const response = await apiClient.get('/api/members/reissue',
                { withCredentials: true }
            );
            // 리프레시 성공시 새 액세스 토큰 저장
            localStorage.setItem('accessToken', response.data.result.accessToken);
            return true;
        } catch (error) {
            // 리프레시 토큰이 만료되었거나 유효하지 않은 경우 - 로그아웃 처리 
            localStorage.removeItem('accessToken');
            return false;
        }
    }

    return false; // 액세스 토큰이 없는 경우
};