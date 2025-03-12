import React from "react";
import ResumeForm from "./ResumeForm";
import Navbar from "../common/NavBar";
import Footer from "../common/Footer";
import { Helmet } from 'react-helmet';

const ResumeFormCom = () => {
    return (
        <div>
            <Helmet>
                <title>햄매니저 - 지원서</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <Navbar />
            <ResumeForm />
            <Footer />
        </div>
    );
}

export default ResumeFormCom;