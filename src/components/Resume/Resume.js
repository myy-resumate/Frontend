import React, { useState, useEffect } from 'react';
import './Resume.css';
import { Paperclip, Download, ChevronLeft } from 'lucide-react';
import apiClient from '../../common/apiClient';
import { useParams, useNavigate } from "react-router-dom";

const Resume = () => {
    const { resumeId } = useParams(); // URL에서 resumeId 가져오기
    const [resume, setResume] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchResume = async (resumeId) => {
        try {
            const response = await apiClient.get(`/api/resumes/${resumeId}`,
                {
                    withCredentials: true
                });

            setResume(response.data.result);
            setError(null);
        } catch (err) {
            setError(err.message || '지원서를 불러오는데 실패했습니다');
            console.error('지원서 로딩 에러:', err);
        }
    };

    //작성 날짜 형식 변환
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 필요
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();

        return `${year}년 ${month}월 ${day}일 ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    };

    //모집기간 형식 변환 
    const formatShortDate = (dateString) => {
        const date = new Date(dateString);

        const year = date.getFullYear().toString().slice(2); // 연도의 마지막 두 자리
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 변환
        const day = String(date.getDate()).padStart(2, '0'); // 일을 2자리로 변환

        return `${year}.${month}.${day}`;
    };

    //처음 렌더링 
    useEffect(() => {
        window.scrollTo(0, 0);  //스크롤 위치 초기화
        fetchResume(resumeId);
    }, [resumeId]);

    const goToEdit = () => {
        navigate(`/edit/${resumeId}`, { state: { resume } });
    }

    const deleteResume = async () => {
        try {
            await apiClient.delete(
                `api/resumes/${resumeId}`,
                {
                    withCredentials: true
                }
            )

            alert("지원서를 삭제하였습니다.");
            navigate('/repo');

        } catch (err) {
            setError(err.message || '지원서를 불러오는데 실패했습니다');
            console.error('지원서 로딩 에러:', err);
        }
    }

    const goToBack = () => {
        navigate("/repo");
    }

    return (
        <div className="application-container">
            <button className='back-btn' onClick={goToBack}>
                <ChevronLeft size={40} viewBox='8 0 24 24' />
            </button>
            <div className="application-header">
                <h1 className="application-title">{resume?.title}</h1>
                <p className="application-date">작성 날짜: {formatDate(resume?.createdAt)}</p>
                <div className="application-tags">
                    <div className="card-tags">
                        {resume?.tags.map((tag) => (
                            <div key={tag.taggingId} className="status-badge">  {/*인덱스 대신 고유id를 사용해야 불필요한 재렌더링을 줄일 수 있다.*/}
                                {tag.tagName}
                            </div>
                        ))}
                    </div>
                    <div className="application-actions">
                        <span onClick={goToEdit} >수정</span>
                        <span className="divider">|</span>
                        <span onClick={deleteResume} >삭제</span>
                    </div>
                </div>
            </div>

            {/* 첨부파일이 존재할 때만 렌더링 */}
            {Array.isArray(resume?.attachments) && resume?.attachments.length > 0 && (
                <div className="application-file">
                    {resume?.attachments.map((file) => (
                        <div className="file-item">
                            <Paperclip />
                            <span className="file-name">
                                <div key={file.attachmentId} >
                                    {file.fileName}
                                </div>
                            </span>
                            <button className="download-btn">
                                <Download />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <div className="application-details">
                <h2 className="org-title">지원처 정보</h2>
                <div className="details-content">
                    <p className="detail-item">{resume?.org}</p>
                    <p className="detail-item">
                        URL: <a href={resume?.orgUrl} className="detail-link">{resume?.orgUrl}</a>
                    </p>
                    <p className="detail-item">모집 기간: {formatShortDate(resume?.applyStart)} - {formatShortDate(resume?.applyEnd)}</p>
                </div>
            </div>

            <div className="application-statement">
                <h2 className="section-title">자기소개서</h2>
                {Array.isArray(resume?.coverLetters) && resume?.coverLetters.length > 0 ? (
                    resume?.coverLetters.map((coverLetter) => (
                        <div className="statement-content" key={coverLetter.coverLetterId}>
                            <p className="statement-label">{coverLetter.question}</p>
                            <div className="statement-text">
                                <p>{coverLetter.answer}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='no-coverLetter'>자기소개서의 질문과 답변을 작성해보세요</div>
                )}
            </div>
        </div>
    );
};

export default Resume;