import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import Header from "../Common/Header";
import { useSidebar } from "../../context/SidebarContext";
import { IoIosArrowForward } from "../../utils/icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Common/Loading";
import ErrorBox from "../Common/ErrorBox";
import { changeYearFormatFnx } from "../../utils/helpers";

const Year = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const { year } = useParams();
  const [branchData, setBranchData] = useState([]);
  const [errorMessage, setErrorMessage] = useState([{ isActive: false }]);
  
  const fetchStudentsByYear = async (year) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}student/${year}`
      );
      console.log("Students for Year:", response);
      setBranchData(response.data.row);
    } catch (error) {
      // console.error(
      //   "Error fetching students by year:",
      //   error.response?.data || error.message
      // );
      setErrorMessage(() => [
        {
          id: Math.random(),
          type: "error",
          message:
            error.response?.data.error ||
            "Failed to fetch data. Please try again.",
          isActive: true,
        },
      ]);
    }
  };

  useEffect(() => {
    fetchStudentsByYear(year);
  }, [year]);

  const changeYearFormat = changeYearFormatFnx(year);
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
