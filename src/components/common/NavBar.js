import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import { useNavigate } from "react-router-dom";
import apiClient from "../../common/apiClient";

const Navbar = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');

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

    const fetchName = async () => {
        try {
            const response = await apiClient.get(
                '/api/members/names',
                { withCredentials: true }
            )

            setName(response.data.result.name);
        } catch (error) {
            setName('알 수 없음');
            console.error('이름 불러오기 실패:', error);
        }
    }

    useEffect(() => {
        fetchName();
    }, []);

    return (
        <div className={styles.navbarContainer}>
            <nav className={styles.navbar}>
                <div className={styles.logo}>
                    <img src="/navilogo.png" alt="Resumate Logo" height="40" />
                </div>
                <div className={styles.menu}>
                    <a href="/">홈</a>
                    <a href="/repo">저장소</a>
                    <a href="/ai">AI 도구</a>
                    <a href="/qna">Q&A</a>
                </div>
                <div>
                    <button className={styles.authButton} onClick={handleLogout}>로그아웃</button>
                </div>
                <div>
                    <span>{name} 님</span>
                </div>
            </nav >
        </div>
    );
};

export default Navbar;
