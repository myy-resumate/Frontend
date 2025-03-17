import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import './Repo.css';
import DocumentCard from './DocumentCard';
import apiClient from '../../apiClient';

const Repo = () => {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');
    const [pageNum, setPageNum] = useState(1);
    const [hasMore, setHasMore] = useState(true);  //더보기 버튼 표시 여부

    // 백엔드에서 데이터를 가져오는 함수
    const fetchDocuments = async () => {
        setIsLoading(true);
        try {
            // 실제 API 엔드포인트로 변경해야 합니다
            const response = await apiClient.get('/api/resumes',
                {
                    params: {
                        page: 0,
                        size: 14,
                        sort: "createdAt,desc"
                    },
                    withCredentials: true
                });

            setHasMore(!response.data.result.last);
            setDocuments(response.data.result.content);
            setError(null);
        } catch (err) {
            setError(err.message || '문서를 불러오는데 실패했습니다');
            console.error('문서 로딩 에러:', err);
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
        console.log("더보기 버튼 클릭, 현재 페이지:", pageNum);
        setIsLoading(true);
        try {
            const response = await apiClient.get('/api/resumes',
                {
                    params: {
                        page: pageNum,
                        size: 14,
                        sort: "createdAt,desc"
                    },
                    withCredentials: true
                });

            console.log("API 응답:", response.data);
            console.log("가져온 데이터 개수:", response.data.result.content.length);

            setHasMore(!response.data.result.last);
            // 기존 문서에 새 문서 추가
            setDocuments([...documents, ...response.data.result.content]);
            // 페이지 번호 증가
            setPageNum(prevPageNum => prevPageNum + 1);


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
                    <Search className="search-icon" size={18} />
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
                                createDate={doc.createDate}
                                tagName={doc.tags}
                                organization={doc.organization}
                                applyStart={doc.applyStart}
                                applyEnd={doc.applyEnd}
                            />
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && hasMore && documents.length > 0 && (
                <div className="load-more">
                    <button
                        className="load-more-button"
                        onClick={handleLoadMore}
                        disabled={isLoading}
                    >
                        {isLoading ? '로딩 중...' : '더보기'}
                        {!isLoading && <span className="arrow-down"><ChevronDown /></span>}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Repo;