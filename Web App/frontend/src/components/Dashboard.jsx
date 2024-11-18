import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Header from "./Header";
import { useSidebar } from "../context/SidebarContext";

const Dashboard = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <Navbar isSidebarVisible={isSidebarVisible} />

      <div
        className={`content-wrapper ${isSidebarVisible ? "" : "full-width"}`}
      >
        <main>
          <div className="bg-blue-500">Dashboard</div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;

// const [studentsPresent, setStudentsPresent] = useState([]);
//   const [enrolledStudents, setEnrolledStudents] = useState([]);
//   const [subject, setSubject] = useState(
//     new URLSearchParams(window.location.search).get("subject") || "Chemistry"
//   );

//   useEffect(() => {
//     if (subject) fetchPresentData(subject);
//     fetchEnrollData();
//   }, [subject]);

//   const fetchPresentData = async (subject) => {
//     const getPresentUrl =
//       "https://script.google.com/macros/s/AKfycbyRVHamgUyNMkpzukgtTCv7ZZxk4UHHXxj7c8SLUrw0OFzvxBnbHhj8vllCw25zvN4/exec?action=getPresentStudents";

//     try {
//       const response = await fetch(getPresentUrl);
//       const data = await response.json();
//       setStudentsPresent(data.filter((student) => student.subject === subject));
//     } catch (error) {
//       console.error("Error fetching present students:", error);
//     }
//   };

//   const fetchEnrollData = async () => {
//     const getEnrollUrl =
//       "https://script.google.com/macros/s/AKfycbyRVHamgUyNMkpzukgtTCv7ZZxk4UHHXxj7c8SLUrw0OFzvxBnbHhj8vllCw25zvN4/exec?action=getAllStudents";

//     try {
//       const response = await fetch(getEnrollUrl);
//       const data = await response.json();
//       setEnrolledStudents(data);
//     } catch (error) {
//       console.error("Error fetching enrolled students:", error);
//     }
//   };

//   const toggleSubmenu = (e) => {
//     const subContainer = e.currentTarget.nextElementSibling;
//     if (subContainer && subContainer.classList.contains("sub-container")) {
//       subContainer.style.maxHeight =
//         subContainer.style.maxHeight === "0px"
//           ? `${subContainer.scrollHeight}px`
//           : "0px";
//     }
//   };
{
  /* <section class="s-page">
            <div class="heading-title">
                <div class="in-head-title">
                    <h1>Student Present Today in <span class="subject-name">Chemistry</span></h1>
                </div>
                <div class="directory">
                    <a href="index.html">Home</a>
                    <span><i class="fa-solid fa-angle-right"></i></span>
                    <a href="enroll.html">Enroll</a>
                </div>
                <div class="in-faculty-title">
                    <h2>Enroll Detials</h2>
                </div>
            </div>
            <div class="faculty-deatils">
                <div class="table-body">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <h2>Studnet Name</h2>
                                </th>
                                <th>
                                    <h2>Roll Number</h2>
                                </th>
                                <th>
                                    <h2>Total Present</h2>
                                </th>
                                <th>
                                    <h2>Total Classroom Time</h2>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="enroll-student">
                            <tr>
                          
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </section>  */
}
{
  /* <section className="s-page">
          <div className="heading-title">
            <h1>
              Students Present Today in <span>{subject}</span>
            </h1>
            <div className="directory">
              <Link to="/">Home</Link>
              <span> / </span>
              <Link to="/enroll">Enroll</Link>
            </div>
            <h2>Enroll Details</h2>
          </div>
          <div className="faculty-details">
            <table>
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Total Present</th>
                  <th>Total Classroom Time</th>
                </tr>
              </thead>
              <tbody>
                {enrolledStudents.map((student) => (
                  <tr key={student.fingerprintID}>
                    <td>{student.name}</td>
                    <td>{student.fingerprintID}</td>
                    <td>{student.totalPresent}</td>
                    <td>{student.totalTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section> */
}
