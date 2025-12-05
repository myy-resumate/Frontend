import React from "react";
// import RecentApplications from "./components/RecentApplications";
import Navbar from "../common/NavBar";
import Footer from "../common/Footer";
import Calendar from "./Calendar";
import DeadlineList from "./DeadlineList";
import RecentResume from "./RecentResume";
import { Helmet } from 'react-helmet';
import "./Home.css";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>햄매니저 - 홈</title>
                <link rel="icon" href="/favicon.ico" />
            </Helmet>

            <Navbar />

            {/* 메인 컨텐츠 영역 */}
            <div className="home-main">
                {/* Calendar와 DeadlineList를 가로로 배치 */}
                <div className="calendar-deadlinelist">
                    <div className="calendar">
                        <Calendar />
                    </div>
                    <div className="deadlineList">
                        <DeadlineList />
                    </div>
                </div>

                {/* RecentResume는 아래에 배치 */}
                <div>
                    <RecentResume />
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Home;
