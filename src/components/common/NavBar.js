import React from "react";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:8080/api/members/logout", {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                withCredentials: true,
            });

            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            navigate("/login");
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <button onClick={goToHome}>
                    <img src="/navilogo.png" alt="Resumate Logo" height="40" />
                </button>
            </div>
            <div className={styles.menu}>
                <a href="/repo">저장소</a>
                <a href="/ai">AI 도구</a>
                <a href="/qna">Q&A</a>
            </div>
            <div>
                <button className={styles.authButton} onClick={handleLogout}>로그아웃</button>
            </div>
            <div>
                <span>누렁이 님</span>
            </div>
        </nav >
    );
};

export default Navbar;
