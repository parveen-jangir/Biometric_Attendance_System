import React from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import { useSidebar } from "../../context/SidebarContext";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Year = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  const branches = [
    { id: 1, name: "Computer Science", path: "/year/cse" },
    { id: 2, name: "Mechanical Engineering", path: "/year/me" },
    { id: 3, name: "Civil Engineering", path: "/year/civil" },
    { id: 4, name: "Electrical Engineering", path: "/year/ee" },
    { id: 5, name: "Information Technology", path: "/year/it" },
  ];

  const students = [
    { id: 1, name: "John Doe", path: "/student/john" },
    { id: 2, name: "Jane Smith", path: "/student/jane" },
    { id: 3, name: "Robert Brown", path: "/student/robert" },
    { id: 4, name: "Emily Davis", path: "/student/emily" },
  ];

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
              <h1>1st Year</h1>
            </div>
            {/* Breadcrumb */}
            <div className="breadcrumb">
              <Link to="/dashboard">Home</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon " />
              </span>
              <span className="current-breadcrumb">Year I</span>
            </div>
          </section>

          {/* Branch Details */}
          <section className="explore-details">
            <div className="explore-header">
              <h2 className="explore-head-title">Branch Details</h2>
              <p className="explore-head-description">
                Select your branch to explore subjects and other details.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Year;
// import React from "react";
// import Navbar from "../Navbar";
// import Header from "../Header";
// import { useSidebar } from "../../context/SidebarContext";
// import { IoIosArrowForward } from "react-icons/io";
// import { Link } from "react-router-dom";

// const Year = () => {
//   const { isSidebarVisible, toggleSidebar } = useSidebar();

//   const branches = [
//     { id: 1, name: "Computer Science", path: "/year/cse" },
//     { id: 2, name: "Mechanical Engineering", path: "/year/me" },
//     { id: 3, name: "Civil Engineering", path: "/year/civil" },
//     { id: 4, name: "Electrical Engineering", path: "/year/ee" },
//     { id: 5, name: "Information Technology", path: "/year/it" },
//   ];

//   return (
//     <>
//       <Header toggleSidebar={toggleSidebar} />
//       <Navbar isSidebarVisible={isSidebarVisible} />
//       <div
//         className={`content-wrapper ${
//           isSidebarVisible ? "" : "full-width"
//         } bg-gray-100 min-h-screen`}
//       >
//         <main className="px-6 py-8">
//           {/* Page Header */}
//           <section className="mb-8">
//             <div className="flex items-center justify-between">
//               <h1 className="text-2xl font-bold text-gray-800">1st Year</h1>
//             </div>
//             {/* Breadcrumb */}
//             <div className="flex items-center space-x-2 text-gray-600 mt-2">
//               <Link to="/dashboard" className="hover:text-blue-600">
//                 Home
//               </Link>
//               <IoIosArrowForward className="text-sm" />
//               <span className="text-gray-800 font-semibold">Year I</span>
//             </div>
//           </section>

//           {/* Branch Details */}
//           <section>
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold text-gray-800">
//                 Branch Details
//               </h2>
//               <p className="text-gray-600 mt-1">
//                 Select your branch to explore subjects and other details.
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {branches.map((branch) => (
//                 <Link
//                   to={branch.path}
//                   key={branch.id}
//                   className="block bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-transform transform hover:-translate-y-1"
//                 >
//                   <h3 className="text-lg font-bold text-gray-800">
//                     {branch.name}
//                   </h3>
//                   <p className="text-gray-600 mt-2">
//                     Dive into the world of {branch.name} to learn about the
//                     subjects and syllabus.
//                   </p>
//                 </Link>
//               ))}
//             </div>
//           </section>
//         </main>
//       </div>
//     </>
//   );
// };

// export default Year;
// // import React, { useEffect, useState } from "react";
// // import Navbar from "../Navbar";
// // import Header from "../Header";
// // import { useSidebar } from "../../context/SidebarContext";
// // import { IoIosArrowForward } from "react-icons/io";
// // import { Link } from "react-router-dom";

// // const Year = () => {
// //   const { isSidebarVisible, toggleSidebar } = useSidebar();

// //   const branches = [
// //     { id: 1, name: "Computer Science", path: "/year/cse" },
// //     { id: 2, name: "Mechanical Engineering", path: "/year/me" },
// //     { id: 3, name: "Civil Engineering", path: "/year/civil" },
// //     { id: 4, name: "Electrical Engineering", path: "/year/ee" },
// //     { id: 5, name: "Information Technology", path: "/year/it" },
// //   ];

// //   return (
// //     <>
// //       <Header toggleSidebar={toggleSidebar} />

// //       <Navbar isSidebarVisible={isSidebarVisible} />

// //       <div
// //         className={`content-wrapper ${isSidebarVisible ? "" : "full-width"}`}
// //       >
// //         <main>
// //           <section className="page">
// //             <div className="head-title">
// //               <h1>1st Year</h1>
// //             </div>
// //             <div className="directory">
// //               <Link to="/dashboard">Home</Link>
// //               <span>
// //                 <IoIosArrowForward className="directory-icon" />
// //               </span>
// //               <Link to="/year">Year I</Link>
// //             </div>
// //             <div className="in-detail-title">
// //               <h2>Branch Detials</h2>
// //             </div>
// //             <div className="branches">
// //               <div className="table-body">
// //                 <table>
// //                   <thead>
// //                     <tr>
// //                       <th>
// //                         <h2>Branches</h2>
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody>
// //                     {branches.map((branch) => (
// //                       <tr key={branch.id}>
// //                         <td>
// //                           <Link className="subjects-name" to={branch.path}>
// //                             <h3>{branch.name}</h3>
// //                           </Link>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>
// //             </div>
// //           </section>
// //         </main>
// //       </div>
// //     </>
// //   );
// // };

// // export default Year;
