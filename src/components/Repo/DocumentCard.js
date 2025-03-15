import React from 'react';
import './DocumentCard.css';

const DocumentCard = ({ title, date, hasStatus, status, isPlus, company, period, applyStart, applyEnd }) => {
    if (isPlus) {
        return (
            <div className="plus-card">
                <div className="plus-icon">+</div>
            </div>
        );
    }

    return (
        <div className="document-card">
            <div className="card-header">
                <span className="card-title">{title}</span>
                {hasStatus && (
                    <span className={`status-badge ${status === '작성' ? 'status-writing' :
                        status === '완료' ? 'status-complete' :
                            status === '임시' ? 'status-temp' :
                                'status-default'
                        }`}>
                        {status}
                    </span>
                )}
            </div>
            <span className="card-date">{date}</span>
            <div className="card-content">
                <div className="card-company">| {company || '지원 회사명'}</div>
                <div className="card-period">모집 기간: {applyStart || '25.02.01'} - {applyEnd || '25.02.20'}</div>
            </div>
        </div>
    );
};

export default DocumentCard;