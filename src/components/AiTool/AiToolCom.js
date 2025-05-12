import React from "react";
import Navbar from "../common/NavBar";
import Footer from "../common/Footer";
import AiTool from "./AiTool";
import { Helmet } from 'react-helmet';

const AiToolCom = () => {
    return (
        <div>
            <Helmet>
                <title>햄매니저 - AI도구</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <Navbar />
            <AiTool />
            <Footer />
        </div>
    );
}

export default AiToolCom;