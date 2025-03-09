import React from "react";
import Navbar from "../common/NavBar";
import Footer from "../common/Footer";
import Repo from "./Repo";
import { Helmet } from 'react-helmet';

const ResumeRepo = () => {
    return (
        <div>
            <Helmet>
                <title>햄매니저 - 저장소</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <Navbar />
            <Repo />
            <Footer />
        </div>
    );
}

export default ResumeRepo;