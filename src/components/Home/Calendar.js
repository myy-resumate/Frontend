import React, { useState, useEffect } from 'react';
import './Calendar.css'; // CSS 파일 import
import apiClient from '../../common/apiClient';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date()); // 오늘 날짜의 년도, 월
    const [selectedDate, setSelectedDate] = useState(new Date().getDate()); // 오늘 날짜의 일 

    const [apiDates, setApiDates] = useState([]); //api에서 받은 날짜 목록
    const [isLoading, setIsLoading] = useState(false); //로딩 상태태

    // [추가] 툴팁 위치 상태 추가
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    // [추가] 활성화된 툴팁 정보 상태 추가
    const [activeTooltip, setActiveTooltip] = useState(null);

    // 요일 이름
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

    // 달의 일수 얻기
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // 해당 월의 첫 날의 요일 얻기
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    // 이전 달
    const prevMonth = () => {
        // setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
        setCurrentDate(newDate);
        fetchDatesForMonth(newDate.getFullYear(), newDate.getMonth()); //이전 달 데이터 api 호출 
    };

    // 다음 달
    const nextMonth = () => {
        // setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
        setCurrentDate(newDate);
        fetchDatesForMonth(newDate.getFullYear(), newDate.getMonth()); //다음 달 데이터 api 호출
    };

    //API에서 해당 월의 데이터 가져오기
    const fetchDatesForMonth = async (year, month) => {
        try {
            setIsLoading(true);  //로딩 상태 

            // axios를 사용한 API 호출
            const monthStr = String(month + 1).padStart(2, '0');  //몇 월(자릿수 맞추기)
            const response = await apiClient.get('/api/home/resumes/calendar', {
                params: {
                    startDate: `${year}-${monthStr}-01`
                },
                withCredentials: true
            });

            // [수정] API 응답 데이터 처리 방식 변경 - 날짜별로 여러 이벤트 그룹화
            const formattedDates = {};

            response.data.result.dateDTOS.forEach(item => {
                const date = new Date(item.applyEnd);
                const day = date.getDate();

                if (!formattedDates[day]) {
                    formattedDates[day] = [];
                }

                // 기업명 추가
                formattedDates[day].push(item.organization);
            });

            // 객체를 배열로 변환
            const datesArray = Object.keys(formattedDates).map(day => ({
                day: parseInt(day),
                events: formattedDates[day]
            }));

            setApiDates(datesArray);
        } catch (error) {
            console.error('API 호출 오류:', error);
        } finally {
            setIsLoading(false);
        }
    };

    //최초 렌더링 시에만 실행 - api 호출 
    useEffect(() => {
        fetchDatesForMonth(currentDate.getFullYear(), currentDate.getMonth());
    }, [currentDate]);

    //날짜에 api 데이터가 있는지 확인하는 함수 
    const getEventForDay = (day) => {
        return apiDates.find(date => date.day === day);
    };

    // [추가] 툴팁 표시 함수
    const showTooltip = (event, day) => {
        const eventData = getEventForDay(day);
        if (eventData) {
            setTooltipPosition({
                x: event.clientX,
                y: event.clientY
            });
            setActiveTooltip({
                day: day,
                events: eventData.events
            });
        }
    };

    // [추가] 툴팁 숨기기 함수
    const hideTooltip = () => {
        setActiveTooltip(null);
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    // 달력 행 생성
    const createCalendarRows = () => {
        const rows = [];
        let cells = [];

        // 빈 셀 추가
        for (let i = 0; i < firstDayOfMonth; i++) {
            cells.push(<td key={`empty-${i}`} className="calendar-cell empty-cell"></td>);
        }

        // 일 추가
        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected = day === selectedDate;
            const isSunday = (day + firstDayOfMonth - 1) % 7 === 0;

            const eventData = getEventForDay(day);
            const hasEvent = !!eventData;

            let cellClassName = "calendar-cell";
            let dayClassName = "day-number";

            if (isSelected) {
                dayClassName += " selected";
            }

            if (isSunday) {
                dayClassName += " sunday";
            }

            if (hasEvent) {
                dayClassName += " has-event";
            }

            cells.push(
                <td key={day} className={cellClassName}>
                    <div
                        className={dayClassName}
                        onClick={() => setSelectedDate(day)}
                        //title={hasEvent ? eventData.event : ''} //이벤트(org)가 있다면 툴팁으로 표시 
                        onMouseEnter={(e) => showTooltip(e, day)}
                        onMouseLeave={hideTooltip}
                    >
                        {day}
                    </div>
                </td>
            );

            // 일주일 완성 또는 마지막 날
            if ((day + firstDayOfMonth) % 7 === 0 || day === daysInMonth) {
                // 마지막 줄의 남은 빈 셀 채우기
                if (day === daysInMonth) {
                    const remainingCells = 7 - cells.length;
                    for (let i = 0; i < remainingCells; i++) {
                        cells.push(<td key={`empty-end-${i}`} className="calendar-cell empty-cell"></td>);
                    }
                }

                rows.push(<tr key={Math.floor((day + firstDayOfMonth - 1) / 7)}>{cells}</tr>);
                cells = [];
            }
        }

        return rows;
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <h2 className="calendar-title">{year}년 {month + 1}월</h2>
                <div className="calendar-nav">
                    <button className="nav-button" onClick={prevMonth}>&lt;</button>
                    <button className="nav-button" onClick={nextMonth}>&gt;</button>
                </div>
            </div>

            {isLoading ? (
                <div className="loading">데이터를 불러오는 중...</div>
            ) : (
                <table className="calendar-table">
                    <thead>
                        <tr>
                            {weekdays.map((day, index) => (
                                <th key={index} className="weekday-header">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {createCalendarRows()}
                    </tbody>
                </table>
            )}

            {/* [추가] 커스텀 툴팁 컴포넌트 */}
            {activeTooltip && (
                <div
                    className="custom-tooltip"
                    style={{
                        top: `${tooltipPosition.y + 10}px`,
                        left: `${tooltipPosition.x + 10}px`
                    }}
                >
                    <div className="tooltip-header">
                        {year}년 {month + 1}월 {activeTooltip.day}일 마감되는 공고
                    </div>
                    <ul className="tooltip-content">
                        {activeTooltip.events.map((event, index) => (
                            <li key={index}>• {event}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Calendar;