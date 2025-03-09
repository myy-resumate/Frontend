import React, { useState } from 'react';
import './Calendar.css'; // CSS 파일 import

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 0)); // 2025년 1월
    const [selectedDate, setSelectedDate] = useState(1); // 1일 선택

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
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    // 다음 달
    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
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

            let cellClassName = "calendar-cell";
            let dayClassName = "day-number";

            if (isSelected) {
                dayClassName += " selected";
            }

            cells.push(
                <td key={day} className={cellClassName}>
                    <div
                        className={dayClassName}
                        onClick={() => setSelectedDate(day)}
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
        </div>
    );
};

export default Calendar;