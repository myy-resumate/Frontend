import React, { useState, useEffect } from 'react';
import ResumeEditForm from './ResumeEditForm';
import Navbar from '../common/NavBar';
import Footer from '../common/Footer';
import { Helmet } from 'react-helmet';

const ResumeEditFormCom = () => {

    return (
        <div>
            <Helmet>
                <title>햄매니저 - 지원서 수정</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <Navbar />
            <ResumeEditForm />
            <Footer />
        </div>
    );
};

export default ResumeEditFormCom;