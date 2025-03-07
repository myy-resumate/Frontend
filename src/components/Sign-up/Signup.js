import React, { useState } from "react";
<<<<<<< Updated upstream
import "./Signup.css"; // 스타일 파일 추가
=======
import styles from "./Signup.module.css"; // 스타일 파일 추가
import { Helmet } from 'react-helmet';
>>>>>>> Stashed changes

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignup = () => {
        alert(`이름: ${name}, 이메일: ${email}, 비밀번호: ${password}`);
        // 회원가입 API 호출 로직 추가 가능
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                {/* 로고 */}
                <img src="/hamlogo.png" alt="Resumate Logo" className="signup-logo" />

<<<<<<< Updated upstream
                {/* 입력 필드 */}
                <input
                    type="text"
                    placeholder="이름을 입력해주세요"
                    className="signup-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="사용하실 이메일을 입력해주세요"
                    className="signup-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="사용하실 패스워드를 입력해주세요"
                    className="signup-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* 회원가입 버튼 */}
                <button className="signup-button" onClick={handleSignup}>
                    회원가입
                </button>
=======
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
>>>>>>> Stashed changes
            </div>
        </div>
    );
};

export default Signup;
