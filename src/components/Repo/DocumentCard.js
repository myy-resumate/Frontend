import React from 'react';
import './DocumentCard.css';

// 날짜 형식 변환 함수
const formatDate = (dateString) => {
    if (!dateString) return ''; // 값이 없으면 빈 문자열 반환

    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2); // 2025 → "25"
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 1월 → "01"
    const day = String(date.getDate()).padStart(2, '0'); // 1일 → "01"

    return `${year}.${month}.${day}`;
};

const DocumentCard = ({ isPlus, title, createDate, tagName, organization, applyStart, applyEnd }) => {

    //날짜 형식 변환환
    const formattedApplyStart = formatDate(applyStart) || '25.02.01';
    const formattedApplyEnd = formatDate(applyEnd) || '25.02.20';

    if (isPlus) {
        return (
            <div className="plus-card">
                <div className="plus-icon">+</div>
            </div>
        );
    }

    return (
        <div className="document-card">
            <div className="card-tags">
                {Array.isArray(tagName) && tagName.length > 0 ? (
                    tagName.map((tag, index) => (
                        <div key={index} className="status-badge">
                            {tag.tagName}
                        </div>
                    ))
                ) : (
                    <div className="no-status-badge">태그 없음</div>
                )}
            </div>
            <div className="card-title">{title}</div>
            <span className="card-date">{createDate}</span>
            <div className="card-content">
                <div className="card-company">| {organization || '지원 회사명'}</div>
                <div className="card-period">모집기간: {formattedApplyStart} - {formattedApplyEnd}</div>
            </div>
        </div>
    );
};

export default DocumentCard;