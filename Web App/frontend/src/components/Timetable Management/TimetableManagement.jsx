import React, { useState } from "react";
import Navbar from "../Common/Navbar";
import Header from "../Common/Header";
import { useSidebar } from "../../context/SidebarContext";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "../../utils/icons";

const Timetable = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();
  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");

  // Timetable data
  const timetableData = {
    "1st Year": {
      "Computer Science": {
        "CS-A": {
          monday: [
            { time: "10:00 AM - 11:00 AM", subject: "Math", room: "101", teacher: "Mr. Smith" },
            { time: "11:00 AM - 12:00 PM", subject: "Science", room: "102", teacher: "Ms. Johnson" },
          ],
          tuesday: [
            { time: "10:00 AM - 11:00 AM", subject: "Physics", room: "201", teacher: "Dr. Carter" },
          ],
        },
        "CS-B": {
          monday: [
            { time: "12:00 PM - 1:00 PM", subject: "English", room: "103", teacher: "Mr. Brown" },
          ],
        },
      },
    },
    "2nd Year": {
      "Mechanical Engineering": {
        "ME-A": {
          monday: [
            { time: "2:00 PM - 3:00 PM", subject: "Thermodynamics", room: "104", teacher: "Mrs. Davis" },
          ],
        },
      },
    },
  };

  // Extract all years, branches, and batches
  const years = Object.keys(timetableData);
  const branches = selectedYear ? Object.keys(timetableData[selectedYear]) : [];
  const batches = selectedBranch ? Object.keys(timetableData[selectedYear][selectedBranch]) : [];

  // Filtered timetable based on selected filters
  const filteredTimetable =
    selectedYear && selectedBranch && selectedBatch
      ? timetableData[selectedYear][selectedBranch][selectedBatch][selectedDay] || []
      : [];

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Navbar isSidebarVisible={isSidebarVisible} />
      <div className={`content-wrapper ${isSidebarVisible ? "" : "full-width"}`}>
        <main>
          <section className="page-header">
            <div className="header-title">
              <h1>Timetable</h1>
            </div>
            <div className="breadcrumb">
              <Link to="/dashboard">Home</Link>
              <span>
                <IoIosArrowForward className="breadcrumb-icon" />
              </span>
              <span className="current-breadcrumb">Timetable</span>
            </div>
            <div className="flex justify-between gap-4 my-4">
              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Branch Filter */}
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                disabled={!selectedYear}
                className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
              >
                <option value="">Select Branch</option>
                {branches.map((branch) => (
                  <option key={branch} value={branch}>
                    {branch}
                  </option>
                ))}
              </select>

              {/* Batch Filter */}
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                disabled={!selectedBranch}
                className="border border-gray-300 rounded-md px-4 py-2 w-full sm:w-1/3"
              >
                <option value="">Select Batch</option>
                {batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>

              {/* Reset Button */}
              <button
                onClick={() => {
                  setSelectedYear("");
                  setSelectedBranch("");
                  setSelectedBatch("");
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Reset
              </button>
            </div>
          </section>

          <section className="explore-details">
            <div className="min-h-screen bg-gray-100 p-5">
              <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  Student Timetable
                </h1>

                {/* Day Selector */}
                <div className="mb-6 flex justify-center gap-4">
                  {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`px-4 py-2 rounded-lg ${
                        selectedDay === day
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"
                      }`}
                    >
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Timetable for Selected Day */}
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 shadow-sm">
                  <h2 className="text-lg font-semibold text-blue-700 mb-3 capitalize">
                    {selectedDay}
                  </h2>
                  {filteredTimetable.length > 0 ? (
                    <ul>
                      {filteredTimetable.map((slot, index) => (
                        <li
                          key={index}
                          className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border border-gray-300 rounded-lg p-3 mb-2 shadow-sm"
                        >
                          <div>
                            <span className="block text-sm text-gray-500">{slot.time}</span>
                            <span className="font-medium text-gray-800">{slot.subject}</span>
                          </div>
                          <div className="text-sm text-gray-600 mt-2 md:mt-0">
                            <span className="block">Room: {slot.room}</span>
                            <span className="block">Teacher: {slot.teacher}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No classes scheduled.</p>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Timetable;

// // import React, { useState } from "react";

// // const Timetable = () => {
// //   const [role, setRole] = useState("student"); // Toggle between student and teacher roles

// //   // Mock timetable data
// //   const timetable = {
// //     monday: [
// //       { time: "9:00 AM - 10:00 AM", subject: "Math", teacher: "Mr. Smith", room: "101" },
// //       { time: "10:00 AM - 11:00 AM", subject: "Science", teacher: "Mrs. Jones", room: "102" },
// //     ],
// //     tuesday: [
// //       { time: "9:00 AM - 10:00 AM", subject: "English", teacher: "Mr. Brown", room: "103" },
// //       { time: "10:00 AM - 11:00 AM", subject: "History", teacher: "Ms. Green", room: "104" },
// //     ],
// //     wednesday: [],
// //     thursday: [
// //       { time: "9:00 AM - 10:00 AM", subject: "Art", teacher: "Mr. Lee", room: "105" },
// //     ],
// //     friday: [
// //       { time: "11:00 AM - 12:00 PM", subject: "Physical Education", teacher: "Coach Carter", room: "Gym" },
// //     ],
// //   };

// //   const days = Object.keys(timetable);

// //   return (
// //     <div className="min-h-screen bg-gray-100 p-5">
// //       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
// //         <h1 className="text-2xl font-bold text-gray-800 mb-4">
// //           {role === "student" ? "Student" : "Teacher"} Timetable
// //         </h1>

// //         {/* Role Selector */}
// //         <div className="mb-6 flex justify-end">
// //           <select
// //             value={role}
// //             onChange={(e) => setRole(e.target.value)}
// //             className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
// //           >
// //             <option value="student">Student</option>
// //             <option value="teacher">Teacher</option>
// //           </select>
// //         </div>

// //         {/* Timetable Grid */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           {days.map((day) => (
// //             <div key={day} className="bg-blue-50 rounded-lg p-4 border border-blue-200 shadow-sm">
// //               <h2 className="text-lg font-semibold text-blue-700 capitalize mb-3">
// //                 {day}
// //               </h2>
// //               {timetable[day].length > 0 ? (
// //                 <ul>
// //                   {timetable[day].map((slot, index) => (
// //                     <li
// //                       key={index}
// //                       className="flex justify-between items-center bg-white border border-gray-300 rounded-lg p-3 mb-2 shadow-sm"
// //                     >
// //                       <div>
// //                         <span className="block text-sm text-gray-500">{slot.time}</span>
// //                         <span className="font-medium text-gray-800">{slot.subject}</span>
// //                       </div>
// //                       <div className="text-sm text-gray-600">
// //                         {role === "student" ? slot.teacher : slot.room}
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </ul>
// //               ) : (
// //                 <p className="text-sm text-gray-500">No classes scheduled.</p>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Timetable;
