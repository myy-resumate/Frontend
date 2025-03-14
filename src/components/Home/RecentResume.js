import React, { useState, useEffect } from 'react';
import "./RecentResume.css";
import DocumentCard from "../Repo/DocumentCard";
import apiClient from "../../apiClient";

const doc = [
    { id: 1, title: "제목", date: "2025.01.01", company: "지원 회사명", period: "25.02.01 - 25.02.20" },
    { id: 2, title: "제목", date: "2025.01.01", company: "지원 회사명", period: "25.02.01 - 25.02.20" },
    { id: 3, title: "제목", date: "2025.01.01", company: "지원 회사명", period: "25.02.01 - 25.02.20" },
    { id: 4, title: "제목", date: "2025.01.01", company: "지원 회사명", period: "25.02.01 - 25.02.20" },
    { id: 5, title: "제목", date: "2025.01.01", company: "지원 회사명", period: "25.02.01 - 25.02.20" },
];

const RecentResume = () => {
    const [documents, setDocuments] = useState([]);

    // API 호출 함수
    useEffect(() => {
        const fetchRecentResumes = async () => {
            try {
                const token = localStorage.getItem("accessToken"); // 저장된 JWT 가져오기

                const response = await apiClient.get("/api/home/resumes/recent", {
                    withCredentials: true, // 쿠키 포함
                });
                setDocuments(response.data.result); // 상태 업데이트
            } catch (error) {
                alert(`데이터 불러오기 실패: ${error.response?.data?.message || "오류 발생"}`);
            }
        };

        fetchRecentResumes();
    }, []);

    return (
        <div className="recent-applications">
            <div className="applications-container">
                <h2 className="applications-title">최근 조회한 지원서</h2>
                <div className="applications-list">
                    {documents.length > 0 ? (
                        documents.map((doc) => (
                            <div className="grid-item" key={doc.id}>
                                <DocumentCard
                                    title={doc.title}
                                    date={doc.createDate}
                                    company={doc.organization}
                                    applyStart={doc.applyStart}
                                    applyEnd={doc.applyEnd}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="no-data">최근 조회한 지원서가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecentResume;
