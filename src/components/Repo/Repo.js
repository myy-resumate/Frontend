import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import './Repo.css';
import DocumentCard from './DocumentCard';

const Repo = () => {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');

    // 백엔드에서 데이터를 가져오는 함수
    const fetchDocuments = async () => {
        setIsLoading(true);
        try {
            // 실제 API 엔드포인트로 변경해야 합니다
            const response = await axios.get('/api/documents');
            setDocuments(response.data);
            setError(null);
        } catch (err) {
            setError(err.message || '문서를 불러오는데 실패했습니다');
            console.error('문서 로딩 에러:', err);

            // 에러 발생 시 테스트 데이터로 대체 (개발용)
            setDocuments([
                { id: 1, title: '제목1', date: '2025.01.01', company: '네이버', period: '25.02.01 - 25.02.20' },
                { id: 2, title: '제목2', date: '2025.01.01', hasStatus: true, status: '완료', company: '카카오', period: '25.02.01 - 25.02.20' },
                { id: 3, title: '제목3', date: '2025.01.01', hasStatus: true, status: '작성', company: '라인', period: '25.02.01 - 25.02.20' },
                { id: 4, title: '제목4', date: '2025.01.01', company: '쿠팡', period: '25.02.01 - 25.02.20' },
                { id: 5, title: '제목5', date: '2025.01.01', company: '배달의민족', period: '25.02.01 - 25.02.20' },
                { id: 6, title: '제목6', date: '2025.01.01', hasStatus: true, status: '임시', company: '토스', period: '25.02.01 - 25.02.20' },
                { id: 7, title: '제목7', date: '2025.01.01', hasStatus: true, status: '작성', company: '당근마켓', period: '25.02.01 - 25.02.20' }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    // 정렬 변경 처리
    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    // 검색어 변경 처리
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // 문서 필터링 및 정렬
    const filteredAndSortedDocuments = documents
        .filter(doc =>
            searchQuery === '' ||
            (doc.title && doc.title.includes(searchQuery)) ||
            (doc.company && doc.company.includes(searchQuery))
        )
        .sort((a, b) => {
            if (sortOrder === 'latest') {
                return new Date(b.date) - new Date(a.date);
            } else {
                return new Date(a.date) - new Date(b.date);
            }
        });

    // 더보기 버튼 처리
    const handleLoadMore = async () => {
        setIsLoading(true);
        try {
            // 여기서는 페이지 기반 로딩 예시를 보여줍니다
            // 실제 구현에서는 마지막 문서 ID 또는 페이지 번호를 사용할 수 있습니다
            const lastDocId = documents.length > 0 ? documents[documents.length - 1].id : 0;

            const response = await axios.get('/api/documents', {
                params: {
                    after: lastDocId,
                    limit: 8
                }
            });

            // 기존 문서에 새 문서 추가
            setDocuments([...documents, ...response.data]);
        } catch (err) {
            console.error('추가 문서 로딩 실패:', err);
            setError('추가 문서를 불러오는데 실패했습니다');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="document-container">
            <div className="page-header">
                <h1 className="page-title">누렁이님의 지원서 저장소</h1>
                <p className="page-description">햄매니저가 지원서를 체계적으로 보관합니다</p>
            </div>

            <div className="filter-section">
                <div className="filter-sort">
                    <select
                        className="sort-select"
                        value={sortOrder}
                        onChange={handleSortChange}
                    >
                        <option value="latest">최신순</option>
                        <option value="oldest">오래된순</option>
                    </select>
                </div>
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="지원서 혹은 태그를 검색하세요 #인턴 #합격"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Search className="search-icon" size={16} />
                </div>
            </div>

            {isLoading && documents.length === 0 ? (
                <div className="loading">문서를 불러오는 중...</div>
            ) : error && documents.length === 0 ? (
                <div className="error-message">
                    {error}
                    <button className="retry-button" onClick={fetchDocuments}>
                        다시 시도
                    </button>
                </div>
            ) : (
                <div className="document-grid">
                    <div className="grid-item">
                        <DocumentCard isPlus={true} />
                    </div>

                    {filteredAndSortedDocuments.map(doc => (
                        <div className="grid-item" key={doc.id}>
                            <DocumentCard
                                title={doc.title}
                                date={doc.date}
                                hasStatus={doc.hasStatus}
                                status={doc.status}
                                company={doc.company}
                                period={doc.period}
                            />
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && documents.length > 0 && (
                <div className="load-more">
                    <button
                        className="load-more-button"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                    >
                        {isLoading ? '로딩 중...' : '더보기'}
                        {!isLoading && <span className="arrow-down">↓</span>}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Repo;