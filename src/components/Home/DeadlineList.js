import React from 'react';
import './DeadlineList.css';

const DeadlineList = () => {
    // 공고 데이터
    const jobListings = [
        { id: 1, company: "네이버", highlighted: true },
        { id: 2, company: "카카오" },
        { id: 3, company: "라인" },
        { id: 4, company: "saffy" },
        { id: 5, company: "우아한 테크 코스" }
    ];

    return (
        <div className="job-listings-container">
            <h3 className="listings-title">지원 마감이 얼마 남지 않았어요</h3>
            <div className="listings-subtitle">마감 임박 공고</div>

            <ul className="listings-list">
                {jobListings.map((job) => (
                    <li
                        key={job.id}
                        className={`listing-item`}
                    >
                        {job.company}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DeadlineList;