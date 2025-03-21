import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import './Repo.css';
import DocumentCard from './DocumentCard';
import apiClient from '../../common/apiClient';
import { useNavigate } from "react-router-dom";


const Repo = () => {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState('latest');
    const [searchQuery, setSearchQuery] = useState('');
    const [pageNum, setPageNum] = useState(0);
    const [hasMore, setHasMore] = useState(true);  //더보기 버튼 표시 여부

    const navigate = useNavigate();
    //지원서 조회 화면으로 이동하는 함수 
    const goToResume = async (resumeId) => {
        navigate(`/resume/${resumeId}`);
    }

    //지원서 저장 화면으로 이동하는 함수수
    const goToResumeForm = async () => {
        navigate("/resume-form");
    }

    //검색어에서 태그 추출
    const extractTags = (query) => {
        const parts = query.split('#');

        // 첫 번째 요소는 # 앞의 텍스트이므로 제외
        parts.shift();

        // 각 부분에서 태그 추출 (공백이나 특수문자 등 제거)
        const tags = parts.map(part => {
            // 각 부분에서 태그 이름만 추출 (알파벳, 숫자, 한글 등 허용)
            const match = part.match(/^([가-힣a-zA-Z0-9]+)/);
            return match ? match[0] : '';
        }).filter(tag => tag !== ''); // 빈 태그 제거

        return tags;
    };

    // 검색 유형 확인하기
    const getSearchType = (query) => {
        if (query.includes('#')) {
            return 'tag';
        }
        return query.trim() ? 'keyword' : 'all';  //앞 뒤 공백 제거 후, 빈 문자열이면 all
    };

    //전체 목록을 가져오는 함수
    const fetchDocuments = async (page = 0) => {
        setIsLoading(true);
        try {
            // 실제 API 엔드포인트로 변경해야 합니다
            const response = await apiClient.get('/api/resumes',
                {
                    params: {
                        page: page,
                        size: 14,
                        sort: "createdAt,desc"
                    },
                    withCredentials: true
                });

            if (page === 0) {
                setDocuments(response.data.result.content);
            } else {
                setDocuments(prev => [...prev, ...response.data.result.content]);
            }

            setHasMore(!response.data.result.last);
            setPageNum(page + 1)
            setError(null);
        } catch (err) {
            setError(err.message || '문서를 불러오는데 실패했습니다');
            console.error('문서 로딩 에러:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 태그로 검색하는 함수
    const searchByTags = async (tags, page = 0) => {
        setIsLoading(true);
        try {
            // 태그를 쉼표로 구분하여 하나의 문자열로 만듦
            const tagsString = tags.join(',');

            const response = await apiClient.get('/api/resumes/tags', {
                params: {
                    tags: tagsString,
                    page: page,
                    size: 14,
                    sort: "createdAt,desc"
                },
                withCredentials: true
            });

            if (page === 0) {
                setDocuments(response.data.result.content);
            } else {
                setDocuments(prev => [...prev, ...response.data.result.content]);
            }

            setHasMore(!response.data.result.last);
            setPageNum(page + 1);
            setError(null);
        } catch (err) {
            setError(err.message || '태그 검색에 실패했습니다');
            console.error('태그 검색 에러:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 키워드로 검색하는 함수
    const searchByKeyword = async (keyword, page = 0) => {
        setIsLoading(true);
        try {
            const response = await apiClient.get('/api/resumes/search', {
                params: {
                    keyword: keyword.trim(),
                    page: page,
                    size: 14
                },
                withCredentials: true
            });

            if (page === 0) {
                setDocuments(response.data.result.content);
            } else {
                setDocuments(prev => [...prev, ...response.data.result.content]);
            }

            setHasMore(!response.data.result.last);
            setPageNum(page + 1);
            setError(null);
        } catch (err) {
            setError(err.message || '키워드 검색에 실패했습니다');
            console.error('키워드 검색 에러:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // 검색 처리하는 함수
    const handleSearch = async (query, page = 0) => {
        const searchType = getSearchType(query);

        if (searchType === 'tag') {
            const tags = extractTags(query);
            if (tags.length > 0) {
                await searchByTags(tags, page);
            } else {
                // 태그 형식이 잘못된 경우 전체 목록 표시
                await fetchDocuments(0);
            }
        } else if (searchType === 'keyword') {
            await searchByKeyword(query, page);
        } else {
            // 검색어가 없으면 전체 목록 표시
            await fetchDocuments(0);
        }
    };

    //처음 렌더링 
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

    // 검색 폼 제출 처리
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchQuery, 0);
    };

    // 문서 정렬
    const filteredAndSortedDocuments = documents
        .sort((a, b) => {
            if (sortOrder === 'latest') {
                return new Date(b.createDate) - new Date(a.createDate);
            } else {
                return new Date(a.createDate) - new Date(b.createDate);
            }
        });

    // 더보기 버튼 처리
    const handleLoadMore = async () => {
        console.log("더보기 버튼 클릭, 현재 페이지:", pageNum);
        setIsLoading(true);

        if (searchQuery.trim()) {
            //검색 상태에서 더보기
            await handleSearch(searchQuery, pageNum);
        } else {
            //전체 목록에서 더보기
            await fetchDocuments(pageNum);
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
                <form className="search-box" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="지원서 혹은 태그를 검색하세요 #인턴 #합격"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Search className="search-icon" size={18} />
                </form>
            </div>

            {isLoading && documents.length === 0 ? (
                <div className="loading">문서를 불러오는 중...</div>
            ) : error && documents.length === 0 ? (
                <div className="error-message">
                    {error}
                    <button className="retry-button" onClick={() => fetchDocuments()}>
                        다시 시도
                    </button>
                </div>
            ) : (
                <div className="document-grid">
                    <div className="grid-item">
                        <button className="invisible-button" onClick={goToResumeForm}>
                            <DocumentCard isPlus={true} />
                        </button>
                    </div>

                    {filteredAndSortedDocuments.map(doc => (
                        <div className="grid-item" key={doc.id}>
                            <button className="invisible-button" onClick={() => goToResume(doc.resumeId)}>
                                <DocumentCard
                                    title={doc.title}
                                    createDate={doc.createDate}
                                    tagName={doc.tags}
                                    organization={doc.organization}
                                    applyStart={doc.applyStart}
                                    applyEnd={doc.applyEnd}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            )
            }

            {
                !isLoading && hasMore && documents.length > 0 && (
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
                )
            }
        </div >
    );
};

export default Repo;