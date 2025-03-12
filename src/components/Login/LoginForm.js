import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 네비게이션 훅 추가
import styles from "./LoginForm.module.css"; // 스타일 파일 추가
import { Helmet } from 'react-helmet';  //탭에 텍스트를 표시하기 위한 라이브러리
import apiClient from "../../apiClient";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // 네비게이션 함수

    const handleLoginForm = async () => {
        // 로그인 API 호출 로직
        try {
            const response = await apiClient.post(
                '/api/members/login',
                { email, password, },
                { withCredentials: true } // 쿠키 포함
            );
            const { accessToken } = response.data;

            // 로컬 스토리지에 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            navigate('/');
        } catch (error) {
            alert(`로그인 실패: ${error.response?.data?.message || '오류 발생'}`);
        }
    };

    const goToSignup = () => {
        navigate("/sign-up"); // 회원가입 페이지로 이동
    };

    return (
        <div>
            <Helmet>
                <title>햄매니저 - 로그인</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    {/* 로고 */}
                    <img src="/hamlogo.png" alt="Resumate Logo" className={styles.loginLogo} />

                    {/* 입력 필드 */}
                    <input
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        className={styles.loginInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="패스워드를 입력해주세요"
                        className={styles.loginInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* 로그인 버튼 */}
                    <button className={styles.loginButton} onClick={handleLoginForm}>
                        로그인
                    </button>

                    {/* 회원가입 버튼 */}
                    <button className={styles.signupButton} onClick={goToSignup}>회원가입</button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
