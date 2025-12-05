import React, { useState, useEffect } from 'react';
import "./RecentResume.css";
import DocumentCard from "../Repo/DocumentCard";
import apiClient from "../../common/apiClient";
import { useNavigate } from "react-router-dom";


const RecentResume = () => {
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();

    // API 호출 함수
    useEffect(() => {
        const fetchRecentResumes = async () => {
            try {
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

    //지원서 조회 화면으로 이동하는 함수 
    const goToResume = async (resumeId) => {
        navigate(`/resume/${resumeId}`);
    }

    return (
        <div className="recent-applications">
            <div className="applications-container">
                <h2 className="applications-title">최근 조회한 지원서</h2>

                {documents.length > 0 ? (
                    <div className="applications-list">
                        {documents.map((doc) => (
                            <div className="grid-item" key={doc.resumeId} >
                                <button className="invisible-button" onClick={() => goToResume(doc.resumeId)}>
                                    <DocumentCard
                                        tagName={doc.tags}
                                        title={doc.title}
                                        createDate={doc.createDate}
                                        organization={doc.organization}
                                        applyStart={doc.applyStart}
                                        applyEnd={doc.applyEnd}
                                    />
                                </button>
                            </div>
                        ))}</div>
                ) : (
                    <div className='no-data-box'>
                        <p className="no-data">최근 조회한 지원서가 없습니다.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RecentResume;
