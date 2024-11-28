import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import Header from "../Common/Header";
import { useSidebar } from "../../context/SidebarContext";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Common/Loading";

const Year = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const { year } = useParams();
  const [branchData, setBranchData] = useState([]);

  const fetchStudentsByYear = async (year) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/api/student/${year}`
      );
      console.log("Students for Year:", response);
      const data = response.data;
      setBranchData(data.row);
    } catch (error) {
      console.error(
        "Error fetching students by year:",
        error.response?.data || error.message
      );
    }
  };
  useEffect(() => {
    fetchStudentsByYear(year);
  }, [year]);
  const changeYearFormat = year
    .replace(/(^\w|\.\s*\w)/g, (match) => match.toUpperCase())
    .replace("-", " ");
  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Navbar isSidebarVisible={isSidebarVisible} />
      <div
        className={`content-wrapper ${isSidebarVisible ? "" : "full-width"}`}
      >
        <main>
          {/* Page Header */}
          <section className="page-header">
            <div className="header-title">
              <h1>{changeYearFormat}</h1>
            </div>
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/dashboard">Home</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon " />
              </span>
              <span className="current-breadcrumb">{changeYearFormat}</span>
            </div>
          </section>

          {/* Branch Details */}
          {branchData ? (
            <section className="explore-details">
              <div className="explore-header">
                <h2 className="explore-head-title">Branch Details</h2>
                <p className="explore-head-description">
                  Select your branch to explore subjects and other details.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {branchData.map((branch) => (
                  <Link
                    to={`/${year}/${branch.path}`}
                    key={branch.branch}
                    className="block bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1"
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {branch.branch}
                    </h3>
                    <p className="text-gray-600 mt-2">
                      Dive into the world of {branch.name} to learn about the
                      subjects and syllabus.
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : (
            <Loading />
          )}
        </main>
      </div>
    </>
  );
};

export default Year;
