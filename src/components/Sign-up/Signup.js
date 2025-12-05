import React, { useState } from "react";
import styles from "./Signup.module.css"; // 스타일 파일 추가
import { Helmet } from 'react-helmet';
import apiClient from '../../common/apiClient';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        // 회원가입 API 호출 로직
        try {
            await apiClient.post('/api/members', {
                name,
                email,
                password,
            });

            alert('회원가입 성공');
            navigate('/login');
        } catch (error) {
            alert(`회원가입 실패: ${error.response?.data?.message || '오류 발생'}`);
        }
    };

    return (
        <div>
            <Helmet>
                <title>햄매니저 - 회원가입</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <div className={styles.signupContainer}>
                <div className={styles.signupBox}>
                    {/* 로고 */}
                    <img src="/hamlogo.png" alt="Resumate Logo" className={styles.signupLogo} />

                    {/* 입력 필드 */}
                    <input
                        type="text"
                        placeholder="이름을 입력해주세요"
                        className={styles.signupInput}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="사용하실 이메일을 입력해주세요"
                        className={styles.signupInput}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="사용하실 패스워드를 입력해주세요"
                        className={styles.signupInput}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* 회원가입 버튼 */}
                    <button className={styles.signupButton} onClick={handleSignup}>
                        회원가입
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
