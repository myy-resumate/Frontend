import React, { useState, useEffect } from 'react';
import './DeadlineList.css';
import apiClient from '../../common/apiClient';

const DeadlineList = () => {
    // 공고 데이터
    const [jobListings, setJobListings] = useState([]);

    useEffect(() => {
        const fetchJobListings = async () => {
            try {
                const response = await apiClient.get('/api/home/resumes/deadline', {
                    withCredentials: true
                });

                setJobListings(response.data.result.deadlineDTOS); // API 응답 데이터 저장
            } catch (error) {
                console.error('데이터 불러오기 실패:', error);
            }
        };

        fetchJobListings();
    }, []);

    return (
        <div className="job-listings-container">
            <h3 className="listings-title">지원 마감이 얼마 남지 않았어요</h3>
            <div className="listings-subtitle">마감 임박 공고</div>
            <ul className="listings-list">
                {jobListings.length > 0 ? (
                    jobListings.map((job, index) => (
                        <li key={index} className="listing-item">
                            <a
                                href={job.orgUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="listing-link"
                            >
                                {job.organization}
                            </a>
                        </li>
                    ))
                ) : (
                    <div className='no-deadline-box'>
                        <p className="no-data">마감 임박 공고가 없습니다.</p>
                    </div>
                )}
            </ul>
        </div>
    );
};

export default DeadlineList;