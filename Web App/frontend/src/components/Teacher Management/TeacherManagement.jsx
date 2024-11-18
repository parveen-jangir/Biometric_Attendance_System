import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import Navbar from "../Navbar";
import Header from "../Header";
import { useSidebar } from "../../context/SidebarContext";

function TeacherManagement() {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  // Dummy data for teachers
  const teachers = [
    {
      id: 1,
      name: "John Doe",
      subject: "Mathematics",
      branch: "Computer Science",
      yearsOfExperience: 5,
      to: "/teacherprofile",
    },
    {
      id: 2,
      name: "Jane Smith",
      subject: "Physics",
      branch: "Mechanical Engineering",
      yearsOfExperience: 3,
      to: "/teacherprofile",
    },
    {
      id: 3,
      name: "David Harris",
      subject: "Chemistry",
      branch: "Chemical Engineering",
      yearsOfExperience: 7,
      to: "/teacherprofile",
    },
    {
      id: 4,
      name: "Rachel Green",
      subject: "Biology",
      branch: "Biotechnology",
      yearsOfExperience: 4,
      to: "/teacherprofile",
    },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      (!searchQuery ||
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (!selectedBranch || teacher.branch === selectedBranch) &&
      (!selectedSubject || teacher.subject.includes(selectedSubject))
    );
  });

  // State to handle filters
  // const [filter, setFilter] = useState("");

  // // Handle filter change
  // const filteredTeachers = teachers.filter((teacher) =>
  //   teacher.name.toLowerCase().includes(filter.toLowerCase())
  // );

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
              <h1>Teacher Management</h1>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Add Teacher
              </button>
              {/* <div className="flex gap-2 items-center">
                <input
                  type="text"
                  // value={filter}
                  // onChange={(e) => setFilter(e.target.value)}
                  className="p-2 border rounded"
                  placeholder="Search by name..."
                />
              </div> */}
            </div>
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/dashboard">Home</Link>

              <span>
                <IoIosArrowForward className="breadcrumb-icon " />
              </span>
              <span className="current-breadcrumb">Teacher Management</span>
              {/* <Link aria-disabled className="current-breadcrumb" to={`/year/${branch}`}>{currentBranch.name}</Link> */}
            </div>
            <div className="flex gap-4 my-4">
              <input
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // value={filter}
                // onChange={(e) => setFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
              />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
              >
                <option value="">Select Branch</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Biotechnology">Biotechnology</option>
              </select>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
              >
                <option value="">Select Subject</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Programming">Programming</option>
              </select>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBranch("");
                  setSelectedSubject("");
                }}
                className="bg-red-500 text-white px-4 py-2 text-nowrap rounded-md hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </section>
          <section className="explore-details">
            <div className="explore-header">
              <h2 className="explore-head-title">Teacher Details</h2>
              <p className="explore-head-description">
                Select your teacher to explore details.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-lg"
                >
                  <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                  <p className="text-gray-600">Subject: {teacher.subject}</p>
                  <p className="text-gray-600">Branch: {teacher.branch}</p>
                  <p className="text-gray-600">
                    Experience: {teacher.yearsOfExperience} years
                  </p>
                  <Link
                    to={teacher.to}
                    className="mt-4 block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center"
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default TeacherManagement;

// import React, { useState } from "react";

// const teachers = [
//   {
//     id: 1,
//     name: "John Doe",
//     branch: "CSE",
//     subjects: ["Mathematics", "Physics"],
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     branch: "ECE",
//     subjects: ["Electronics", "Signals"],
//   },
//   {
//     id: 3,
//     name: "Emily Johnson",
//     branch: "IT",
//     subjects: ["Programming", "Database"],
//   },
// ];

// const TeacherManagement = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedBranch, setSelectedBranch] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");

//   const filteredTeachers = teachers.filter((teacher) => {
//     return (
//       (!searchQuery ||
//         teacher.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
//       (!selectedBranch || teacher.branch === selectedBranch) &&
//       (!selectedSubject || teacher.subjects.includes(selectedSubject))
//     );
//   });

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       {/* Header Section */}
//       <div className="flex justify-between items-center bg-white shadow p-4 rounded-md">
//         <h1 className="text-2xl font-bold text-gray-800">Teacher Management</h1>
//         <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
//           Add Teacher
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="flex gap-4 my-4">
//         <input
//           type="text"
//           placeholder="Search by name"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
//         />
//         <select
//           value={selectedBranch}
//           onChange={(e) => setSelectedBranch(e.target.value)}
//           className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
//         >
//           <option value="">Select Branch</option>
//           <option value="CSE">CSE</option>
//           <option value="ECE">ECE</option>
//           <option value="IT">IT</option>
//         </select>
//         <select
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//           className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
//         >
//           <option value="">Select Subject</option>
//           <option value="Mathematics">Mathematics</option>
//           <option value="Physics">Physics</option>
//           <option value="Programming">Programming</option>
//         </select>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
//         <div className="bg-white shadow rounded-md p-4">
//           <h2 className="text-gray-700 font-semibold">Total Teachers</h2>
//           <p className="text-2xl font-bold text-gray-800">{teachers.length}</p>
//         </div>
//         <div className="bg-white shadow rounded-md p-4">
//           <h2 className="text-gray-700 font-semibold">Branches</h2>
//           <p className="text-gray-600">CSE, ECE, IT</p>
//         </div>
//         <div className="bg-white shadow rounded-md p-4">
//           <h2 className="text-gray-700 font-semibold">Subjects</h2>
//           <p className="text-gray-600">Mathematics, Physics, Programming...</p>
//         </div>
//       </div>

//       {/* Teacher Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredTeachers.map((teacher) => (
//           <div key={teacher.id} className="bg-white shadow rounded-md p-4">
//             <h3 className="text-xl font-bold text-gray-800">{teacher.name}</h3>
//             <p className="text-gray-600">Branch: {teacher.branch}</p>
//             <p className="text-gray-600">
//               Subjects: {teacher.subjects.join(", ")}
//             </p>
//             <div className="flex gap-2 mt-4">
//               <button className="text-blue-500 hover:text-blue-700">
//                 Edit
//               </button>
//               <button className="text-red-500 hover:text-red-700">
//                 Delete
//               </button>
//               <button className="text-green-500 hover:text-green-700">
//                 View Profile
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TeacherManagement;
