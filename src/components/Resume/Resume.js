import React from 'react';
import './Resume.css';
import { Paperclip, Download } from 'lucide-react';

const Resume = () => {
    return (
        <div className="application-container">
            <div className="application-header">
                <h1 className="application-title">현대 소프티어 부트캠프 지원</h1>
                <p className="application-date">작성 날짜: 2024년 12월 1일 15:34</p>
                <div className="application-tags">
                    <span className="tag tag-red">서류 탈락</span>
                    <span className="tag tag-beige">완료</span>
                    <div className="application-actions">
                        <span>수정</span>
                        <span className="divider">|</span>
                        <span>삭제</span>
                    </div>
                </div>
            </div>

            <div className="application-file">
                <div className="file-item">
                    <Paperclip />
                    <span className="file-name">현대_소프티어_이력서.pdf</span>
                    <button className="download-btn">
                        <Download />
                    </button>
                </div>
            </div>

            <div className="application-details">
                <h2 className="org-title">지원처 정보</h2>
                <div className="details-content">
                    <p className="detail-item">현대 소프티어 부트캠프</p>
                    <p className="detail-item">
                        URL: <a href="https://softeerbootcamp.hyundaimotorgroup.com" className="detail-link">https://softeerbootcamp.hyundaimotorgroup.com</a>
                    </p>
                    <p className="detail-item">모집 기간: 24.12.01 - 24.12.30</p>
                </div>
            </div>

            <div className="application-statement">
                <h2 className="section-title">자기소개서</h2>
                <div className="statement-content">
                    <p className="statement-label">성장 과정</p>
                    <div className="statement-text">
                        <p>"끊임없는 도전과 배움을 갈조하는 환경에서 자라났습니다. 무모님께서는 항상 새로운 시도를 격려하며 실패를 두려워하지 않는 태도를 길러주셨습니다. 이러한 배경 덕분에 저는 초등학교 시절부터 다양한 활동에 참여하며 적극적으로 세상을 탐구하는 자세를 갖출 수 있었습니다. 특히, 중학교 때 참여한 스프트웨어 경진대회는 제에게 큰 동기부여가 되었으며, 이후 컴퓨터 공학이라는 분야에 관심을 갖게 된 계기가 되었습니다."</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Resume;