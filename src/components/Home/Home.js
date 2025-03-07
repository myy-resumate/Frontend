import React from "react";
// import RecentApplications from "./components/RecentApplications";
import Navbar from "../common/NavBar";
import Footer from "../common/Footer";
import Calendar from "./Calendar";
import DeadlineList from "./DeadlineList";
import { Helmet } from 'react-helmet';

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>햄매니저 - 홈</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <Navbar />
            <div style={{ display: "flex", gap: "px" }}>
                <div style={{ flex: 1.5 }}>
                    <Calendar />
                </div>
                <div style={{ flex: 1 }}>
                    <DeadlineList />
                </div>
                {/* <RecentApplications /> */}
            </div>

            <Footer />
        </div>
    );
}

export default Home;
