import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import { IoIosArrowForward } from "react-icons/io";

function BranchPage() {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const { branch } = useParams();
  const navigate = useNavigate();
  const branches = [
    { id: 1, short: "cse", name: "Computer Science", path: "/year/cse" },
    { id: 2, short: "me", name: "Mechanical Engineering", path: "/year/me" },
    { id: 3, short: "civil", name: "Civil Engineering", path: "/year/civil" },
    { id: 4, short: "ee", name: "Electrical Engineering", path: "/year/ee" },
    { id: 5, short: "it", name: "Information Technology", path: "/year/it" },
  ];

  const dummyStudents = [
    {
      id: 1,
      name: "John Doe",
      enrollmentNumber: "EN123456",
      branch: "Computer Science",
      batch: "Batch A",
      semester: "3rd",
      year: "2nd",
      attendance: 85,
      to: "/studentprofile",
    },
    {
      id: 2,
      name: "Jane Smith",
      enrollmentNumber: "EN123457",
      branch: "Mechanical Engineering",
      batch: "Batch B",
      semester: "2nd",
      year: "1st",
      attendance: 92,
      to: "/studentprofile",
    },
    {
      id: 3,
      name: "Ali Khan",
      enrollmentNumber: "EN123458",
      branch: "Electrical Engineering",
      batch: "Batch C",
      semester: "1st",
      year: "1st",
      attendance: 78,
      to: "/studentprofile",
    },
    {
      id: 4,
      name: "Emily Davis",
      enrollmentNumber: "EN123459",
      branch: "Civil Engineering",
      batch: "Batch D",
      semester: "4th",
      year: "2nd",
      attendance: 95,
      to: "/studentprofile",
    },
    {
      id: 5,
      name: "Michael Lee",
      enrollmentNumber: "EN123460",
      branch: "Computer Science",
      batch: "Batch A",
      semester: "3rd",
      year: "2nd",
      attendance: 88,
      to: "/studentprofile",
    },
    {
      id: 6,
      name: "Sophie Turner",
      enrollmentNumber: "EN123461",
      branch: "Chemical Engineering",
      batch: "Batch E",
      semester: "2nd",
      year: "1st",
      attendance: 90,
      to: "/studentprofile",
    },
    {
      id: 7,
      name: "David Harris",
      enrollmentNumber: "EN123462",
      branch: "Information Technology",
      batch: "Batch F",
      semester: "5th",
      year: "3rd",
      attendance: 80,
      to: "/studentprofile",
    },
    {
      id: 8,
      name: "Rachel Green",
      enrollmentNumber: "EN123463",
      branch: "Biotechnology",
      batch: "Batch G",
      semester: "6th",
      year: "3rd",
      attendance: 76,
      to: "/studentprofile",
    },
    {
      id: 9,
      name: "Mark Wilson",
      enrollmentNumber: "EN123464",
      branch: "Physics",
      batch: "Batch H",
      semester: "1st",
      year: "1st",
      attendance: 83,
      to: "/studentprofile",
    },
    {
      id: 10,
      name: "Lucas Brown",
      enrollmentNumber: "EN123465",
      branch: "Mathematics",
      batch: "Batch I",
      semester: "4th",
      year: "2nd",
      attendance: 91,
      to: "/studentprofile",
    },
  ];

  const currentBranch = branches.find((b) => b.short === branch);

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
              <h1>Branch: {currentBranch.name}</h1>
              <div className="flex gap-2 items-center">
              <input
                type="text"
                // value={filter}
                // onChange={(e) => setFilter(e.target.value)}
                className="p-2 border rounded"
                placeholder="Search by name..."
              />
            </div>
            </div>
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/dashboard">Home</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon " />
              </span>
              <Link to="/year">Year I</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon " />
              </span>
              <span className="current-breadcrumb">{currentBranch.name}</span>
              {/* <Link aria-disabled className="current-breadcrumb" to={`/year/${branch}`}>{currentBranch.name}</Link> */}
            </div>
          </section>

          <section className="explore-details">
            <div className="explore-header">
              <h2 className="explore-head-title">Student Details</h2>
              <p className="explore-head-description">
                Select your student to explore details.
              </p>
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {branches.map((branch) => (
                <Link
                  to={branch.path}
                  key={branch.id}
                  className="block bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {branch.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Dive into the world of {branch.name} to learn about the
                    subjects and syllabus.
                  </p>
                </Link>
              ))}
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {dummyStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-white shadow-md rounded-lg p-4 transform transition-transform ease-in-out delay-0  hover:scale-105 hover:shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-2">{student.name}</h3>
                  <p className="text-gray-600">
                    Enrollment: {student.enrollmentNumber}
                  </p>
                  <p className="text-gray-600">Branch: {student.branch}</p>
                  <p className="text-gray-600">Batch: {student.batch}</p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-gray-600">
                      Year:{" "}
                      <span className="font-semibold">{student.year}</span>
                    </p>
                    <p className="text-gray-600">
                      Semester:{" "}
                      <span className="font-semibold">{student.semester}</span>
                    </p>
                  </div>
                  <p className="text-gray-600">
                    Attendance:{" "}
                    <span className="text-green-600 font-bold">
                      {student.attendance}%
                    </span>
                  </p>
                  <button
                    onClick={() => navigate(student.to)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    More Details
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="text-lg font-semibold mb-2">
                    Name: <span className="text-gray-700">John Doe</span>
                  </div>
                  <div className="text-gray-600 mb-2">
                    Enrollment: <span className="font-medium">123456</span>
                  </div>
                  <div className="text-gray-600 mb-2">
                    Branch: <span className="font-medium">CSE</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-600">
                      Year: <span className="font-medium">3rd</span>
                    </div>
                    <div className="text-gray-600">
                      Sem: <span className="font-medium">5th</span>
                    </div>
                  </div>
                  <div className="text-gray-600 mb-4">
                    Attendance Rate:{" "}
                    <span className="font-medium text-green-500">85%</span>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    More Details
                  </button>
                </div>
              </div>

              <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="text-lg font-semibold mb-2">
                    Name: <span className="text-gray-700">Jane Smith</span>
                  </div>
                  <div className="text-gray-600 mb-2">
                    Enrollment: <span className="font-medium">789012</span>
                  </div>
                  <div className="text-gray-600 mb-2">
                    Branch: <span className="font-medium">ECE</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-gray-600">
                      Year: <span className="font-medium">2nd</span>
                    </div>
                    <div className="text-gray-600">
                      Sem: <span className="font-medium">3rd</span>
                    </div>
                  </div>
                  <div className="text-gray-600 mb-4">
                    Attendance Rate:{" "}
                    <span className="font-medium text-green-500">92%</span>
                  </div>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    More Details
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Student Details */}
          {/* <section>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Student Details
              </h2>
              <p className="text-gray-600 mt-1">
                Select your student to explore details.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <Link
                  to={student.path}
                  key={student.id}
                  className="block bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1"
                >
                  <h3 className="text-lg font-bold text-gray-800">
                    {student.name}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    View details about {student.name}, their performance, and
                    attendance.
                  </p>
                </Link>
              ))}
            </div>
          </section> */}

          {/* <div className="page-cards">
              <div className="card">
                <div className="card-container">
                  <div className="card-info">
                    <div className="card-name">Name</div>
                    <div className="card-enroll">Enroll</div>
                    <div className="card-branch">branch</div>
                    <div className="card-year-sem">
                      <div className="card-year">year</div>
                      <div className="card-sem">sem</div>
                    </div>
                    <div className="card-attendance-rate">85%</div>
                  </div>

                  <div className="card-button">More Details</div>
                </div>
              </div>
            </div> */}
        </main>
      </div>
    </>
  );
}

export default BranchPage;
