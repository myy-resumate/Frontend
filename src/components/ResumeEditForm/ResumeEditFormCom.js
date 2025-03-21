import React, { useState, useEffect } from 'react';
import ResumeEditForm from './ResumeEditForm';
import Navbar from '../common/NavBar';
import Footer from '../common/Footer';
import { Helmet } from 'react-helmet';
import apiClient from '../../common/apiClient';
import { useParams } from "react-router-dom";

const ResumeEditFormCom = () => {
    const { resumeId } = useParams(); // URL에서 resumeId 가져오기
    const [resume, setResume] = useState(null);
    const [error, setError] = useState(null);

    //기존 지원서 상세 조회 api 호출
    const fetchResume = async () => {
        try {
            const response = await apiClient.get(
                `/api/resumes/${resumeId}`,
                {
                    withCredentials: true
                }
            )

            setResume(response.data.result);
        } catch (err) {
            setError(err.message || '지원서를 불러오는데 실패했습니다');
            console.error('지원서 로딩 에러:', err);
        }
    }

    useEffect(() => {
        fetchResume();
    }, [resumeId]);

    return (
        <div>
            <Helmet>
                <title>햄매니저 - 지원서 수정</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <Navbar />
            <ResumeEditForm savedData={resume} />
            <Footer />
        </div>
    );
};

export default ResumeEditFormCom;