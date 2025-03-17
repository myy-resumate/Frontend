import React from 'react';
import './DocumentCard.css';

const DocumentCard = ({ isPlus, title, createDate, tagName, organization, applyStart, applyEnd }) => {
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
                            {tag}
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
                <div className="card-period">모집 기간: {applyStart || '25.02.01'} - {applyEnd || '25.02.20'}</div>
            </div>
        </div>
    );
};

export default DocumentCard;