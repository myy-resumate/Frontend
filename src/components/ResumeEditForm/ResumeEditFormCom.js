import React from 'react';
import ResumeEditForm from './ResumeEditForm';
import Navbar from '../common/NavBar';
import Footer from '../common/Footer';
import { Helmet } from 'react-helmet';

// 수정할 저장된 데이터 예시
const savedResumeData = {
    title: '카카오 인턴십 지원서',
    tags: ['IT', '인턴', '개발'],
    files: ['이력서.pdf', '포트폴리오.zip'],
    organization: '카카오',
    url: 'https://careers.kakao.com',
    applyStart: '2025-03-01',
    applyEnd: '2025-03-31',
    questions: [
        {
            question: '지원 동기를 작성해주세요.',
            answer: '저는 어릴 때부터 프로그래밍에 관심이 많았으며...'
        },
        {
            question: '본인의 역량과 경험에 대해 작성해주세요.',
            answer: '대학교에서 컴퓨터 공학을 전공하며 다양한 프로젝트를 진행했습니다...'
        }
    ]
};

const ResumeEditFormCom = () => {
    return (
        <div>
            <Helmet>
                <title>햄매니저 - 지원서 수정</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <Navbar />
            <ResumeEditForm savedData={savedResumeData} />
            <Footer />
        </div>
    );
};

export default ResumeEditFormCom;