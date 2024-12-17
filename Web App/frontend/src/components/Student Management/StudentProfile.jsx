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
import Header from "../Common/Header";
import Navbar from "../Common/Navbar";
import { useSidebar } from "../../context/SidebarContext";
import { Link, useParams } from "react-router-dom";
import { IoIosArrowForward } from "../../utils/icons";
import axios from "axios";
import ErrorBox from "../Common/ErrorBox";
import {
  changeBranchFormatFnx,
  changeYearFormatFnx,
} from "../../utils/helpers";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const StudentProfile = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState("personalInfo");
  // const [attendanceData, setAttendanceData] = useState([]);
  const [performanceData, setPerformanceData] = useState({});
  const { year, branch, studentprofile } = useParams();
  const [studentProfileData, setStudentProfileData] = useState([]);
  const [errorMessage, setErrorMessage] = useState([{ isActive: false }]);

  // Generate random attendance data for heatmap
  useEffect(() => {
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

  const handleChildError = (type, message) => {
    setErrorMessage(() => [
      {
        id: Math.random(),
        type: type,
        message: message,
        isActive: true,
      },
    ]);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "personalInfo":
        return (
          <PersonalInformation
            studentProfileData={studentProfileData}
            year={year}
            branch={branch}
            studentprofile={studentprofile}
            handleChildError={handleChildError}
          />
        );
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
  const fetchStudentsByYear = async (
    year,
    branch,
    studentprofile,
    setStudentProfileData
  ) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}student/${year}/${branch}/${studentprofile}`
      );
      console.log("Students for Year:", response);
      setStudentProfileData(response.data.row);
    } catch (error) {
      // console.error(
      //   "Error fetching students by year:",
      //   error.response?.data.error || error.message
      // );
      handleChildError(
        "error",
        error.response?.data.error ||
          "Failed to fetch student profile. Please try again."
      );
      // setErrorMessage(() => [
      //   {
      //     id: Math.random(),
      //     type: "error",
      //     message:
      //       error.response?.data.error ||
      //       "Failed to fetch student profile. Please try again.",
      //     isActive: true,
      //   },
      // ]);
    }
  };
  useEffect(() => {
    fetchStudentsByYear(year, branch, studentprofile, setStudentProfileData);
  }, [year, branch, studentprofile]);

  const changeYearFormat = changeYearFormatFnx(year);
  const changeBranchFormat = changeBranchFormatFnx(branch);

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
              <h1>Student Profile</h1>
            </div>
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/dashboard">Home</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon " />
              </span>
              <Link to={`/${year}`} onClick={(e) => e.stopPropagation()}>
                {changeYearFormat}
              </Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon " />
              </span>
              <Link
                to={`/${year}/${branch}`}
                onClick={(e) => e.stopPropagation()}
              >
                {changeBranchFormat}
              </Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon " />
              </span>
              <span className="current-breadcrumb">Student Profile</span>
            </div>
            {errorMessage[0].isActive &&
              errorMessage.map((errorMessage) => (
                <ErrorBox
                  key={errorMessage.id}
                  type={errorMessage.type}
                  message={errorMessage.message}
                  onClose={() => {
                    setErrorMessage([{ isActive: false }]);
                  }}
                />
              ))}
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

export default StudentProfile;
