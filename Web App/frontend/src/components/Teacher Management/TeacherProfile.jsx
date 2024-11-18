import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import PersonalInformation from "./PersonalInformation";
import AttendanceHistory from "./AttendanceHistory";
import Header from "../Header";
import Navbar from "../Navbar";
import { useSidebar } from "../../context/SidebarContext";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TeacherProfile = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  const [activeTab, setActiveTab] = useState("personalInfo");
  const [attendanceData, setAttendanceData] = useState([]);
  const [performanceData, setPerformanceData] = useState({});

  // Generate random attendance data for heatmap
  useEffect(() => {
    const randomAttendance = Array.from({ length: 31 }, () =>
      Math.floor(Math.random() * 2)
    ); // 0 or 1 for present/absent
    setAttendanceData(randomAttendance);

    // Generate random performance data for bar chart
    const performance = {
      labels: ["Math", "Science", "History", "Computer", "English"],
      datasets: [
        {
          label: "Scores",
          data: Array.from({ length: 5 }, () =>
            Math.floor(Math.random() * 100)
          ), // 0 to 100 random scores
          backgroundColor: [
            "#1E40AF",
            "#2563EB",
            "#3B82F6",
            "#60A5FA",
            "#93C5FD",
          ],
        },
      ],
    };
    setPerformanceData(performance);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "personalInfo":
        return <PersonalInformation />;
      case "attendanceHistory":
        return <AttendanceHistory />;
      case "performance":
        return (
          <div className="tab-content">
            <h3 className="text-xl font-bold">Performance</h3>
            <Bar
              data={performanceData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" } },
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <Navbar isSidebarVisible={isSidebarVisible} />
      <div
        className={`content-wrapper ${isSidebarVisible ? "" : "full-width"}`}
      >
        <main>
          <section className="page-header">
            <div className="header-title">
              <h1>Teacher Profile</h1>
            </div>
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/dashboard">Home</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon " />
              </span>

              <Link to="/teacher-management">Teacher Management</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon " />
              </span>
              <span className="current-breadcrumb">Teacher Profile</span>
            </div>
          </section>
          <div className="student-profile-container">
            {/* <h1 className="text-2xl text-gray-800 font-semibold mb-4">
              Student Profile
            </h1> */}
            <div className="tabs">
              <button
                className={`tab-button ${
                  activeTab === "personalInfo" ? "active" : ""
                }`}
                onClick={() => setActiveTab("personalInfo")}
              >
                Personal Information
              </button>
              <button
                className={`tab-button ${
                  activeTab === "attendanceHistory" ? "active" : ""
                }`}
                onClick={() => setActiveTab("attendanceHistory")}
              >
                Attendance History
              </button>
              <button
                className={`tab-button ${
                  activeTab === "performance" ? "active" : ""
                }`}
                onClick={() => setActiveTab("performance")}
              >
                Performance
              </button>
            </div>
            <div className="tab-content-container mt-4">
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default TeacherProfile;
