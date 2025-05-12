import React, { useState } from 'react';
import { ChevronsRight, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './AiTool.module.css';
import apiClient from '../../common/apiClient';

function AiTool() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentExample, setCurrentExample] = useState(0);
    const [examples, setExamples] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        try {
            console.log("Searching for:", searchQuery);
            setIsLoading(true);
            const response = await apiClient.post(
                '/api/ai',
                { question: searchQuery },
                { withCredentials: true }
            );

            // API 응답 데이터가 있는지 확인하고 안전하게 처리
            //const answerList = response.data?.result?.questionAnswerDTOList || [];
            setExamples(response.data.result.questionAnswerDTOList);
            setCurrentExample(0);
        } catch (error) {
            console.error('Error fetching question:', error);
            setExamples([]); // 에러 발생 시 빈 배열로 초기화
        } finally {
            setIsLoading(false);
        }
    }

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handlePrevExample = () => {
        setCurrentExample(prev => prev > 0 ? prev - 1 : examples.length - 1);
    };

    const handleNextExample = () => {
        setCurrentExample(prev => (prev + 1) % examples.length);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>AI가 편리한 작성을 도와줍니다</h1>
                <p className={styles.subtitle}>자기소개서의 유사 질문을 검색할 수 있습니다</p>
            </div>

            <div className={styles.searchSection}>
                {/* <p className={styles.searchInfo}>자기소개서의 질문을 입력하면, 기존에 저장한 자기소개서 질문 중 유사한 질문을 알려줍니다</p> */}

                <div className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="자소서의 질문을 입력해주세요"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearch} className={styles.searchButton} disabled={isLoading}>
                        {isLoading ? '검색 중...' : '검색'}
                    </button>
                </div>
            </div>

            <div className={styles.examplesBox}>
                {examples.length > 0 ? (
                    <>
                        <div className={styles.exampleContent}>
                            <p className={styles.question}>{examples[currentExample].question}</p>
                            <p className={styles.answer}>{examples[currentExample].answer}</p>
                            <a href={"/resume/" + examples[currentExample].resumeId} className={styles.exampleLink}>해당 지원서로 이동 <ChevronsRight size={18} /></a>

                            <div className={styles.navigationButtons}>
                                <button onClick={handlePrevExample} className={styles.navButton} disabled={examples.length <= 1}>
                                    <ChevronLeft size={20} />
                                </button>
                                <span className={styles.exampleCounter}>{currentExample + 1} / {examples.length}</span>
                                <button onClick={handleNextExample} className={styles.navButton} disabled={examples.length <= 1}>
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className={styles.emptyMessage}>자기소개서의 질문을 입력하면, 기존에 저장한 자기소개서 질문 중 유사한 질문을 알려줍니다</p>
                )}
            </div>
        </div>
    );
}

export default AiTool;