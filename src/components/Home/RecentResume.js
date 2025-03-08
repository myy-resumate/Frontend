import React from "react";
import "./RecentResume.css";

const applications = [
    { id: 1, title: "제목", date: "2025.01.01", company: "지원 회사명", status: "default" },
    { id: 2, title: "제목", date: "2025.01.01", company: "지원 회사명", status: "icon" },
    { id: 3, title: "제목", date: "2025.01.01", company: "지원 회사명", status: "default" },
    { id: 4, title: "제목", date: "2025.01.01", company: "지원 회사명", status: "default" },
    { id: 5, title: "제목", date: "2025.01.01", company: "지원 회사명", status: "closed" },
];

const RecentResume = () => {
    return (
        <div className="recent-applications">
            <div className="applications-container">
                <h2 className="applications-title">최근 조회한 지원서</h2>
                <div className="applications-list">
                    {applications.map((app, index) => (
                        <div key={app.id} className="application-card">
                            <div className="card-image">
                                {app.status === "icon" && <span className="icon">📄</span>}
                                {app.status === "closed" && <span className="badge">마감</span>}
                            </div>
                            <div className="card-content">
                                <strong>{app.title}</strong> <span>{app.date}</span>
                                <p>| {app.company}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecentResume;
