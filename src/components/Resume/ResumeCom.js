import React from "react";
import Resume from "./Resume";
import Navbar from "../common/NavBar";
import Footer from "../common/Footer";
import { Helmet } from 'react-helmet';

const ResumeCom = (resumeId) => {
    return (
        <div>
            <Helmet>
                <title>햄매니저 - 지원서</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <Navbar />
            <Resume resumeId={resumeId} />
            <Footer />
        </div>
    );
}

export default ResumeCom;