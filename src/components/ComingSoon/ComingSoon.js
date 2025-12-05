import React from 'react';
import './ComingSoon.css';
import Navbar from '../common/NavBar';
import Footer from '../common/Footer';

const ComingSoon = ({ serviceName }) => {
    return (
        <div>
            <Navbar />
            <div className="coming-soon-container">
                <div className="content-box">
                    <div className="logo-container">
                        <img src="/coming_soon_logo.png" alt="Cute Hamster Logo" className="hamster-logo" />
                    </div>
                    <div className="text-container">
                        <h2 className="korean-title">서비스 준비 중입니다</h2>
                        <p className="korean-text">보다 나은 서비스를 위해 열심히 개발 중에 있습니다.</p>
                        <p className="korean-text">빠른 시일 내에 {serviceName} 서비스로 찾아뵙겠습니다.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ComingSoon;