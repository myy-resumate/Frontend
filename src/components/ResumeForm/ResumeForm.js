import React, { useState } from 'react';
import { FileUp, Plus } from 'lucide-react';
import './ResumeForm.css';

const ResumeForm = () => {
    const [title, setTitle] = useState('');
    // 태그에 대한 함수 만들어야함
    const [tags, setTags] = useState([]);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        organization: '',
        url: '',
        applyStart: '',
        applyEnd: '',
        introduction: '',
        details: ''
    });

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
        alert('지원서가 저장되었습니다.');
    };

    const removeFile = (index) => {
        const newFiles = [...files];
        newFiles.splice(index, 1);
        setFiles(newFiles);
    };

    return (
        <div className="application-container">
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
                    className="tag"
                    placeholder='태그 이름' />
                <button className="btn btn-add">
                    <Plus />
                </button>
                <button className="btn btn-save" onClick={handleSubmit}>저장</button>
            </div>

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
                        <label for="organization">지원처</label>
                        <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleFormChange}
                            className="form-input"
                            placeholder="지원처명을 입력하세요"
                        />
                    </div>
                    <div className="form-group">
                        <label for="url">URL</label>
                        <input
                            type="text"
                            name="url"
                            value={formData.url}
                            onChange={handleFormChange}
                            className="form-input"
                            placeholder="지원처 사이트의 링크를 입력하세요"
                        />
                    </div>
                    <div className="form-group-date">
                        <label for="applyStart">지원 시작일</label>
                        <input
                            type="date"
                            name="applyStart"
                            value={formData.applyStart}
                            onChange={handleFormChange}
                            className="form-input-date"
                            placeholder="지원 시작일을 입력하세요"
                        />
                        <label for="applyEnd">지원 마감일</label>
                        <input
                            type="date"
                            name="applyEnd"
                            value={formData.applyEnd}
                            onChange={handleFormChange}
                            className="form-input-date"
                            placeholder="지원 마감일을 입력하세요"
                        />
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h2 className="section-header">자기소개서</h2>
                <p className="section-desc">자소서의 질문과 답변을 저장하면 AI가 기존에 저장한 자소서의 비슷한 내용을 알려줍니다</p>

                <div className="form-content">
                    <div className="form-group">
                        <textarea
                            type="text"
                            className="form-question"
                            placeholder="질문을 입력하세요"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="introduction"
                            value={formData.introduction}
                            onChange={handleFormChange}
                            className="form-answer"
                            placeholder="답변을 입력하세요"
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                <button className="add-section-btn">
                    <Plus />
                </button>
            </div>
        </div>
    );
};

export default ResumeForm;