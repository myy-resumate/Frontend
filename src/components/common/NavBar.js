import React from "react";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import apiClient from "../../common/apiClient";

const Navbar = () => {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    const handleLogout = async () => {
        try {
            await apiClient.post("/api/members/logout", {
                withCredentials: true,
            });

            localStorage.removeItem("accessToken");
            navigate("/login");
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    return (
        <div className={styles.navbarContainer}>
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
        </div>
    );
};

export default Navbar;
