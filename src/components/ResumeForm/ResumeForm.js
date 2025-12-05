import React, { useState } from 'react';
import { FileUp, Plus, ChevronLeft } from 'lucide-react';
import './ResumeForm.css';
import apiClient from "../../common/apiClient";
import { useNavigate } from "react-router-dom";

const ResumeForm = () => {
    const [title, setTitle] = useState('');
    // 태그에 대한 함수 만들어야함
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        organization: '',
        url: '',
        applyStart: '',
        applyEnd: ''
    });
    const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
    const navigate = useNavigate();

    //폼데이터를 json으로 변환하기 위한 객체 생성 
    const formatToJson = (title, tags, formData, questions, files) => {
        //자소서 질문, 답변 format 생성
        const coverLetterDTOS = questions
            .filter(coverLetter => coverLetter.question.trim() !== '' || coverLetter.answer.trim() !== '')
            .map(coverLetter => {
                return {
                    question: coverLetter['question'],
                    answer: coverLetter['answer']
                };
            });

        //파일 이름, 형식
        const fileDTOS = files.map(fileDto => {
            return {
                fileName: fileDto.file.name,
                contentType: fileDto.file.type
            };
        });

        const requestData = {
            title: title,
            tags: tags,
            organization: formData.organization,
            orgURl: formData.url,
            applyStart: formData.applyStart,
            applyEnd: formData.applyEnd,
            coverLetterDTOS: coverLetterDTOS,
            fileDTOS: fileDTOS
        }

        return requestData;
    }

    // S3에 파일 업로드
    const uploadFilesToS3 = async (result) => {
        try {
            const uploadPromises = result.fileDTOS.map(async (fileDto, index) => {
                const file = files[index].file;  //업로드할 파일
                let response;
                let success = false;

                //업로드를 3번 시도
                for (let attempt = 1; attempt <= 3; attempt++) {
                    try {
                        response = await fetch(fileDto.presignedUrl, {
                            method: 'PUT',
                            body: file,
                        });

                        if (response.ok) {
                            success = true;
                            break; // 업로드 성공 → 루프 종료
                        }
                    } catch (e) {
                        // 네트워크 에러도 재시도 대상
                    }

                    console.warn(`업로드 실패 → 재시도 ${attempt}/3 : ${file.name}`);
                }

                //재시도해도 실패 
                if (!success) {
                    throw new Error(`파일 업로드 실패: ${file.name}`);
                }
                return response;
            });

            await Promise.all(uploadPromises);  //각 업로드를 동시에 실행하고, 다 끝날 때까지 기다리기 
            console.log('모든 파일이 S3에 업로드되었습니다.');
        } catch (error) {
            console.error('S3 업로드 중 오류 발생:', error);
            //s3 업로드 실패했으므로 이미 생성된 지원서 삭제
            await apiClient.delete(
                `api/resumes/${result.resumeId}`,
                {
                    withCredentials: true
                }
            )
            throw new Error("파일 첨부에 실패했습니다.");
        }
    };

    //지원서 저장 api 호출
    const saveResume = async () => {
        const requestData = formatToJson(title, tags, formData, questions, files)

        const fd = new FormData();
        const jsonBlob = new Blob([JSON.stringify(requestData)/*Json으로 변환하는 함수*/], { type: 'application/json' });
        fd.append('request', jsonBlob);

        try {
            const response = await apiClient.post(
                "/api/resumes",
                fd,
                {
                    withCredentials: true
                }
            )

            const result = response.data.result;
            console.log(result.fileDTOS);

            // presigned URL이 있으면 S3에 파일 업로드
            if (result.fileDTOS.length > 0) {
                await uploadFilesToS3(result);
            }

            return result.resumeId;
        } catch (error) {
            console.error('에러 발생:', error);
            throw error;
        }
    }

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const newFiles = [...files, {
                file: file,
                name: file.name
            }];
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

    //저장 동작
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resumeId = await saveResume();

            if (resumeId) {
                navigate(`/resume/${resumeId}`);
                alert('지원서가 저장되었습니다.');
            } else {
                alert('저장 중 오류가 발생했습니다.');
            }
        } catch (error) {
            alert('저장 중 오류가 발생했습니다: ' + error.message);
        }
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

    const goToBack = () => {
        navigate("/repo");
    }

    return (
        <div className="application-container">
            <button className='back-btn' onClick={goToBack}>
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
                <button className="btn btn-save" onClick={handleSubmit}>저장</button>
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

            {/* 파일 첨부 */}
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
                            <span className="file-name">{file.name}</span>
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

export default ResumeForm;