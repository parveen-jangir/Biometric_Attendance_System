import React, { useEffect, useState } from "react";
import Navbar from "./Common/Navbar";
import Header from "./Common/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";
import { IoIosArrowForward } from "../utils/icons";

const Enrollment = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const [activeTab, setActiveTab] = useState("student");
  const [studentFilters, setStudentFilters] = useState({
    searchQuery: "",
    selectedBranch: "",
    selectedBatch: "",
  });
  const [teacherFilters, setTeacherFilters] = useState({
    searchQuery: "",
    selectedBranch: "",
    selectedBatch: "",
  });
  const { branch } = useParams();
  const navigate = useNavigate();

  // const branches = [
  //   { id: 1, short: "cse", name: "Computer Science", path: "/year/cse" },
  //   { id: 2, short: "me", name: "Mechanical Engineering", path: "/year/me" },
  //   { id: 3, short: "civil", name: "Civil Engineering", path: "/year/civil" },
  //   { id: 4, short: "ee", name: "Electrical Engineering", path: "/year/ee" },
  //   { id: 5, short: "it", name: "Information Technology", path: "/year/it" },
  // ];
  // const currentBranch = branches.find((b) => b.short === branch);
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
  const dummyTeachers = [
    {
      TeacherID: 1,
      TeacherName: "Dr. Alan Brown",
      Subjects: ["Mathematics", "Linear Algebra"],
      Department: "Mathematics",
      Experience: 10,
      Path: "/teacher-profile/alan-brown",
    },
    {
      TeacherID: 2,
      TeacherName: "Ms. Emma Green",
      Subjects: ["Physics", "Quantum Mechanics"],
      Department: "Physics",
      Experience: 8,
      Path: "/teacher-profile/emma-green",
    },
    {
      TeacherID: 3,
      TeacherName: "Mr. Liam Smith",
      Subjects: ["Computer Science", "Data Structures"],
      Department: "Computer Science",
      Experience: 6,
      Path: "/teacher-profile/liam-smith",
    },
    {
      TeacherID: 4,
      TeacherName: "Ms. Sophia Johnson",
      Subjects: ["English", "Literature"],
      Department: "Humanities",
      Experience: 12,
      Path: "/teacher-profile/sophia-johnson",
    },
    {
      TeacherID: 5,
      TeacherName: "Dr. Ethan Davis",
      Subjects: ["Mechanical Engineering", "Thermodynamics"],
      Department: "Mechanical Engineering",
      Experience: 15,
      Path: "/teacher-profile/ethan-davis",
    },
    {
      TeacherID: 6,
      TeacherName: "Ms. Olivia Wilson",
      Subjects: ["Chemistry", "Organic Chemistry"],
      Department: "Chemistry",
      Experience: 9,
      Path: "/teacher-profile/olivia-wilson",
    },
    {
      TeacherID: 7,
      TeacherName: "Dr. Noah Moore",
      Subjects: ["Electrical Engineering", "Electronics"],
      Department: "Electrical Engineering",
      Experience: 7,
      Path: "/teacher-profile/noah-moore",
    },
    {
      TeacherID: 8,
      TeacherName: "Mr. Lucas Miller",
      Subjects: ["Civil Engineering", "Structural Analysis"],
      Department: "Civil Engineering",
      Experience: 10,
      Path: "/teacher-profile/lucas-miller",
    },
    {
      TeacherID: 9,
      TeacherName: "Ms. Mia White",
      Subjects: ["Biology", "Genetics"],
      Department: "Biology",
      Experience: 5,
      Path: "/teacher-profile/mia-white",
    },
    {
      TeacherID: 10,
      TeacherName: "Dr. Ava Thompson",
      Subjects: ["Information Technology", "Cybersecurity"],
      Department: "Information Technology",
      Experience: 11,
      Path: "/teacher-profile/ava-thompson",
    },
  ];
  const distinctBranches = [
    { Department: "Computer Science" },
    { Department: "Mechanical Engineering" },
    { Department: "Civil Engineering" },
    { Department: "Electrical Engineering" },
    { Department: "Information Technology" },
  ];
  const distinctBatch = [
    { BatchName: "Batch A" },
    { BatchName: "Batch B" },
    { BatchName: "Batch C" },
    { BatchName: "Batch D" },
    { BatchName: "Batch E" },
  ];
  const distinctSubjects = [
    { SubjectName: "Mathematics" },
    { SubjectName: "Physics" },
    { SubjectName: "Chemistry" },
    { SubjectName: "Computer Science" },
    { SubjectName: "Biology" },
  ];

  const updateFilter = (e, updateState) => {
    const { name, value } = e.target;
    if (updateState === "student") {
      setStudentFilters((prev) => ({ ...prev, [name]: value }));
    } else if (updateState === "teacher") {
      setTeacherFilters((prev) => ({ ...prev, [name]: value }));
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
              <h1>Enrollment</h1>
            </div>
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/dashboard">Home</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon" />
              </span>
              <span className="current-breadcrumb">Enrollment</span>
            </div>
          </section>

          {/* Tabs */}
          <div className="tabs flex justify-center border-b mb-4">
            <button
              className={`tab-button px-4 py-2 ${
                activeTab === "student" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => {
                setActiveTab("student");
                setStudentFilters({
                  searchQuery: "",
                  selectedBranch: "",
                  selectedBatch: "",
                });
              }}
            >
              Student Enrollment
            </button>
            <button
              className={`tab-button px-4 py-2 ${
                activeTab === "teacher" ? "border-b-2 border-blue-500" : ""
              }`}
              onClick={() => {
                setActiveTab("teacher");
                setTeacherFilters({
                  searchQuery: "",
                  selectedBranch: "",
                  selectedSubject: "",
                });
              }}
            >
              Teacher Enrollment
            </button>
          </div>

          {activeTab === "student" ? (
            <>
              <div className="flex justify-between gap-4 my-4">
                <input
                  type="text"
                  name="searchQuery"
                  value={studentFilters.searchQuery}
                  onChange={(e) => updateFilter(e, "student")}
                  placeholder="Search by name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
                />
                <select
                  name="selectedBranch"
                  value={studentFilters.selectedBranch}
                  onChange={(e) => updateFilter(e, "student")}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
                >
                  <option value="">Select Branch</option>
                  {distinctBranches.map((branch, idx) => (
                    <option key={idx} value={branch.Department}>
                      {branch.Department}
                    </option>
                  ))}
                </select>
                <select
                  name="selectedBatch"
                  value={studentFilters.selectedBatch}
                  onChange={(e) => updateFilter(e, "student")}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
                >
                  <option value="">Select Batch</option>
                  {distinctBatch.map((batch, idx) => (
                    <option key={idx} value={batch.BatchName}>
                      {batch.BatchName}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    setStudentFilters({
                      searchQuery: "",
                      selectedBranch: "",
                      selectedBatch: "",
                    });
                  }}
                  className="bg-red-500 text-white px-4 py-2 text-nowrap rounded-md hover:bg-red-600"
                >
                  Reset
                </button>
              </div>
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
                          <span className="font-semibold">
                            {student.semester}
                          </span>
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
                {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
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
            </div> */}
              </section>
            </>
          ) : (
            <>
              <div className="flex justify-between gap-4 my-4">
                <input
                  type="text"
                  name="searchQuery"
                  value={teacherFilters.searchQuery}
                  onChange={(e) => updateFilter(e, "teacher")}
                  placeholder="Search by name"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
                />
                <select
                  name="selectedBranch"
                  value={teacherFilters.selectedBranch}
                  onChange={(e) => updateFilter(e, "teacher")}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
                >
                  <option value="">Select Branch</option>
                  {distinctBranches.map((branch, idx) => (
                    <option key={idx} value={branch.Department}>
                      {branch.Department}
                    </option>
                  ))}
                </select>
                <select
                  name="selectedSubject"
                  value={teacherFilters.selectedSubject}
                  onChange={(e) => updateFilter(e, "teacher")}
                  className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
                >
                  <option value="">Select Subject</option>
                  {distinctSubjects.map((subject, idx) => (
                    <option key={idx} value={subject.SubjectName}>
                      {subject.SubjectName}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    setTeacherFilters({
                      searchQuery: "",
                      selectedBranch: "",
                      selectedSubject: "",
                    });
                  }}
                  className="bg-red-500 text-white px-4 py-2 text-nowrap rounded-md hover:bg-red-600"
                >
                  Reset
                </button>
              </div>
              <section className="explore-details">
                <div className="explore-header">
                  <h2 className="explore-head-title">Teacher Details</h2>
                  <p className="explore-head-description">
                    Select your teacher to explore details.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dummyTeachers.map((teacher) => (
                    <div
                      key={teacher.TeacherID}
                      className="bg-white flex justify-between flex-col shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg"
                    >
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {teacher.TeacherName}
                        </h3>
                        <p className="text-gray-600">
                          Subject: {teacher.Subjects.join(", ")}
                        </p>
                        <p className="text-gray-600">
                          Branch: {teacher.Department}
                        </p>
                        <p className="text-gray-600">
                          Experience: {teacher.Experience} years
                        </p>
                      </div>
                      <button
                        onClick={() => navigate(teacher.Path)}
                        // to={`/teacher-management/${teacher.Path}`}
                        className="mt-4 bg-blue-500 text-white w-full py-2 px-4 rounded hover:bg-blue-600 "
                      >
                        View Profile
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

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
        </main>
      </div>
    </>
  );
};

export default Enrollment;
