import React, { useEffect, useState, useRef } from "react";
import EmployeeSidebar from "./EmployeeSidebar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function EmployeeAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const [selectedDate, setSelectedDate] = useState("");
  const [dayData, setDayData] = useState(null);

  const dateRef = useRef(null); // 🔥 for direct calendar open

  // 🔥 Monthly data
  useEffect(() => {
    const email = localStorage.getItem("email");
    fetch(`http://localhost:8082/attendance/${email}?month=${month}&year=${year}`)
      .then(res => res.json())
      .then(data => setAttendance(data))
      .catch(err => console.log(err));
  }, [month, year]);

  // 🔥 Fetch by date
  const fetchByDate = (date) => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:8082/attendance/day?email=${email}&date=${date}`)
      .then(res => res.json())
      .then(data => setDayData(data))
      .catch(err => console.log(err));
  };

  // 🔥 Month change
  const changeMonth = (direction) => {
    let newMonth = month + direction;
    let newYear = year;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    setMonth(newMonth);
    setYear(newYear);
  };

  // 🎨 Styles
  const layout = { display: "flex", minHeight: "100vh", background: "#f5f7fb" };
  const main = { flex: 1, padding: "30px", marginLeft: "290px" };

  const header = {
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    padding: "30px",
    borderRadius: "15px",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between"
  };

  const section = {
    marginTop: "25px",
    background: "#fff",
    borderRadius: "12px",
    padding: "20px"
  };

  const table = { width: "100%", borderCollapse: "collapse", marginTop: "15px" };
  const th = { padding: "12px", background: "#eef2ff", color: "#4f46e5" };
  const td = { padding: "12px", borderBottom: "1px solid #eee" };

  const btn = {
    background: "#4f46e5",
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  };

  return (
    <div style={layout}>
      <EmployeeSidebar />

      <div style={main}>
        {/* 🔥 HEADER */}
        <div style={header}>
          <h2>Attendance</h2>
          <div>
            <button style={btn} onClick={() => changeMonth(-1)}>
              <FaArrowLeft />
            </button>
            <span style={{ margin: "0 10px" }}>{month}/{year}</span>
            <button style={btn} onClick={() => changeMonth(1)}>
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* 🔥 BUTTON */}
        <div style={{ marginTop: "20px" }}>
          <button
            style={btn}
            onClick={() => dateRef.current.showPicker()} // 🔥 direct open
          >
            See Attendance
          </button>

          {/* 🔥 HIDDEN INPUT */}
          <input
            type="date"
            ref={dateRef}
            style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              fetchByDate(e.target.value);
            }}
          />
        </div>

        {/* 🔥 DAY DATA */}
        {dayData && (
          <div style={{
            marginTop: "20px",
            background: "#eef2ff",
            padding: "15px",
            borderRadius: "10px"
          }}>
            <p><b>Date:</b> {dayData.date}</p>
            <p><b>Status:</b> {dayData.status}</p>
            <p><b>Check-in:</b> {dayData.checkIn}</p>
            <p><b>Check-out:</b> {dayData.checkOut}</p>
          </div>
        )}

        {/* 🔥 MONTH TABLE (UNCHANGED) */}
        <div style={section}>
          <table style={table}>
            <thead>
              <tr>
                <th style={th}>Date</th>
                <th style={th}>Day</th>
                <th style={th}>Status</th>
                <th style={th}>Check-in</th>
                <th style={th}>Check-out</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((record, index) => (
                  <tr key={index}>
                    <td style={td}>{record.date}</td>
                    <td style={td}>{record.day}</td>
                    <td style={td}>{record.status}</td>
                    <td style={td}>{record.checkIn}</td>
                    <td style={td}>{record.checkOut}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td style={td} colSpan="5">No attendance records</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default EmployeeAttendance;