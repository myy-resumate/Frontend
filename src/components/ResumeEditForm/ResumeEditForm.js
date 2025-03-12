import React, { useState, useEffect } from 'react';
import { FileUp, Plus, ChevronLeft } from 'lucide-react';
import './ResumeEditForm.css';

const ResumeEditForm = ({ savedData }) => {
    // 기존 저장된 데이터로 초기화
    const [title, setTitle] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        organization: '',
        url: '',
        applyStart: '',
        applyEnd: '',
        introduction: '',
        details: ''
    });
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]);

    // 저장된 데이터로 초기화
    useEffect(() => {
        if (savedData) {
            setTitle(savedData.title || '');
            setTags(savedData.tags || []);
            setFiles(savedData.files || []);
            setFormData({
                organization: savedData.organization || '',
                url: savedData.url || '',
                applyStart: savedData.applyStart || '',
                applyEnd: savedData.applyEnd || '',
                introduction: savedData.introduction || '',
                details: savedData.details || ''
            });

            if (savedData.questions && savedData.questions.length > 0) {
                setQuestions(savedData.questions);
            }
        }
    }, [savedData]);

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const newFiles = [...files, e.target.files[0].name];
            setFiles(newFiles);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('지원서가 수정되었습니다.');
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    const addTag = () => {
        if (tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    const handleQuestionChange = (index, field, value) => {
        const newQuestions = [...questions];
        newQuestions[index][field] = value;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', answer: '' }]);
    };

    const removeQuestion = (index) => {
        if (questions.length > 1) {
            const newQuestions = [...questions];
            newQuestions.splice(index, 1);
            setQuestions(newQuestions);
        }
    };

    return (
        <div className="application-container">
            <button className='back-btn'>
                <ChevronLeft size={40} viewBox='8 0 24 24' />
            </button>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="title-input"
                    placeholder="제목을 입력해주세요"
                />
            </div>

            <div className="button-row">
                <input
                    className="form-tag"
                    placeholder='태그 이름'
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                />
                <button className="btn btn-add" onClick={addTag}>
                    <Plus />
                </button>
                <button className="btn btn-save" onClick={handleSubmit}>수정 완료</button>
            </div>

            {tags.length > 0 && (
                <div className="tag-container">
                    {tags.map((tag, index) => (
                        <div key={index} className="tag-item" >
                            <span>{tag}</span>
                            <button className="remove-tag" onClick={() => removeTag(index)}>×</button>
                        </div>
                    ))}
                </div>
            )}

            <div className="file-upload">
                <label htmlFor="file-input" className="file-label">
                    <FileUp />
                    이미지나 파일을 첨부하세요
                </label>
                <input
                    id="file-input"
                    type="file"
                    onChange={handleFileChange}
                    className="file-input"
                />
            </div>

            {files.length > 0 && (
                <div className="attached-files">
                    {files.map((file, index) => (
                        <div key={index} className="file-item">
                            <span className="file-name">{file}</span>
                            <button className="remove-file" onClick={() => removeFile(index)}>×</button>
                        </div>
                    ))}
                </div>
            )}

            <div className="form-section">
                <h2 className="section-header">지원처 정보</h2>
                <div className="form-content">
                    <div className="form-group">
                        <label htmlFor="organization">지원처</label>
                        <input
                            type="text"
                            id="organization"
                            name="organization"
                            value={formData.organization}
                            onChange={handleFormChange}
                            className="form-input"
                            placeholder="지원처명을 입력하세요"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">URL</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleFormChange}
                            className="form-input"
                            placeholder="지원처 사이트의 링크를 입력하세요"
                        />
                    </div>
                    <div className="form-group-date">
                        <label htmlFor="applyStart">지원 시작일</label>
                        <input
                            type="date"
                            id="applyStart"
                            name="applyStart"
                            value={formData.applyStart}
                            onChange={handleFormChange}
                            className="form-input-date"
                        />
                        <label htmlFor="applyEnd">지원 마감일</label>
                        <input
                            type="date"
                            id="applyEnd"
                            name="applyEnd"
                            value={formData.applyEnd}
                            onChange={handleFormChange}
                            className="form-input-date"
                        />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h2 className="section-header">자기소개서</h2>
                <p className="section-desc">자소서의 질문과 답변을 저장하면 AI가 기존에 저장한 자소서의 비슷한 내용을 알려줍니다</p>

                {questions.map((item, index) => (
                    <div key={index} className="form-content question-answer-section">
                        <div className="form-group">
                            <textarea
                                value={item.question}
                                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                                className="form-question"
                                placeholder="질문을 입력하세요"
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                value={item.answer}
                                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                                className="form-answer"
                                placeholder="답변을 입력하세요"
                            />
                        </div>
                        {questions.length > 1 && (
                            <button className="remove-question-btn" onClick={() => removeQuestion(index)}>
                                ×
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="form-actions">
                <button className="add-section-btn" onClick={addQuestion}>
                    <Plus />
                </button>
            </div>
        </div>
    );
};

export default ResumeEditForm;