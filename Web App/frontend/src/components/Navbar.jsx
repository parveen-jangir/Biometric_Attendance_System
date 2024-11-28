import React from "react";
import { Link } from "react-router-dom";
import { GoHome, GoHomeFill } from "react-icons/go";
import {
  PiStudentLight,
  PiChalkboardTeacherLight,
  PiChalkboardTeacherFill,
  PiStudentFill,
} from "react-icons/pi";
import { IoPeopleOutline, IoPeopleSharp   } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RiTableLine } from "react-icons/ri";


function Navbar({ isSidebarVisible }) {
  const navIconContainer = [
    { navigation: "Dashboard", lightIcon: GoHome, to: "/dashboard" },
    { navigation: "Enroll", lightIcon: IoPeopleOutline, to: "/enroll" },
    { navigation: "Student Management", lightIcon: PiStudentLight, to: "/students" },
    {
      navigation: "Teacher Management",
      lightIcon: PiChalkboardTeacherLight,
      to: "/teacher-management",
    },{
      navigation: "TimeTable",
      lightIcon: RiTableLine,
      to: "/timetable",
    },
  ];

  const toggleSubmenu = (e) => {
    const subContainer = e.currentTarget.nextElementSibling;
    if (subContainer && subContainer.classList.contains("sub-container")) {
      subContainer.style.maxHeight =
        subContainer.style.maxHeight === "0px"
          ? `${subContainer.scrollHeight}px`
          : "0px";
    }
  };

  return (
    <>
      {isSidebarVisible ? (
        <nav>
          <div className="n-container">
            <div className="n-in-container">
              {navIconContainer.map((item, index) => (
                <div key={index} className="n-container-title ">
                  <div className="page-heading">
                    <Link className="in-page-heading" to={item.to}>
                      <div className="nav-icons">
                        <item.lightIcon className="nav-icon text-yellow" />
                        {/* <GoHomeFill /> */}
                      </div>
                      <div className="n-title">
                        <h4>{item.navigation}</h4>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}

              {/* <div className="n-container-title ">
                <div className="page-heading">
                  <Link className="in-page-heading" to="/dashboard">
                    <div className="nav-icons">
                      <GoHome className="nav-icon" />
                      <GoHomeFill />
                    </div>
                    <div className="n-title">
                      <h4>Dashboard</h4>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="n-container-title">
                <div className="page-heading">
                  <Link className="in-page-heading" to="/enroll">
                    <div className="nav-icons">
                      <IoPeopleOutline className="nav-icon" />
                      <IoPeopleSharp />
                    </div>
                    <div className="n-title">
                      <h4>Enroll</h4>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="n-container-title">
                <div className="page-heading">
                  <Link className="in-page-heading" to="/students">
                    <div className="nav-icons">
                      <PiStudentLight className="nav-icon" />
                      <PiStudentFill />
                    </div>
                    <div className="n-title">
                      <h4>Student Management</h4>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="n-container-title">
                <div className="page-heading">
                  <Link className="in-page-heading" to="/teachers">
                    <div className="nav-icons">
                      <PiChalkboardTeacherLight className="nav-icon" />
                      <PiChalkboardTeacherFill />
                    </div>
                    <div className="n-title">
                      <h4>Teacher Management</h4>
                    </div>
                  </Link>
                </div>
              </div> */}
              
              <div className="n-container-title">
                <div className="page-heading" onClick={toggleSubmenu}>
                  <Link to="#" className="in-page-heading">
                    <div className="nav-icons">
                      <PiStudentLight className="nav-icon" />
                    </div>
                    <div className="n-title">
                      <h4>Student Management</h4>
                    </div>
                  </Link>
                  <div className="n-icon-title">
                    {/* <i className="fa-solid fa-angle-down"></i> */}
                    <IoIosArrowDown className="n-icon"  />
                  </div>
                </div>

                <div className="sub-container">
                  <div className="in-sub-container">
                    <div className="sub-page-heading">
                      <Link className="in-sub-page-heading" to="/year">
                        <div className="mini-nav-icons">
                          <GoHome className="mini-nav-icon" />
                        </div>
                        <div className="sub-n-title">
                          <h4>Year 1</h4>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="in-sub-container">
                    <div className="sub-page-heading">
                      <Link className="in-sub-page-heading" to="#">
                        <div className="mini-nav-icons">
                          <GoHome className="mini-nav-icon" />
                        </div>
                        <div className="sub-n-title">
                          <h4>Year 2</h4>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="in-sub-container">
                    <div className="sub-page-heading">
                      <Link className="in-sub-page-heading" to="#">
                        <div className="mini-nav-icons">
                          <GoHome className="mini-nav-icon" />
                        </div>
                        <div className="sub-n-title">
                          <h4>Year 3</h4>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="in-sub-container">
                    <div className="sub-page-heading">
                      <Link className="in-sub-page-heading" to="#">
                        <div className="mini-nav-icons">
                          <GoHome className="mini-nav-icon" />
                        </div>
                        <div className="sub-n-title">
                          <h4>Year 4</h4>
                        </div>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

              <div className="n-container-title">
                <div className="page-heading" onClick={toggleSubmenu}>
                  <Link to="#" className="in-page-heading">
                    <div className="nav-icons">
                      <GoHome className="nav-icon" />
                    </div>
                    <div className="n-title">
                      <h4>Demo</h4>
                    </div>
                  </Link>
                  <div className="n-icon-title">
                    <i className="fa-solid fa-angle-down"></i>
                  </div>
                </div>

                <div className="sub-container">
                  <div className="in-sub-container">
                    <div className="sub-page-heading">
                      <Link className="in-sub-page-heading" to="#">
                        <div className="mini-nav-icons">
                          <GoHome className="mini-nav-icon" />
                        </div>
                        <div className="sub-n-title">
                          <h4>Demo</h4>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="in-sub-container">
                    <div className="sub-page-heading">
                      <Link className="in-sub-page-heading" to="#">
                        <div className="mini-nav-icons">
                          <GoHome className="mini-nav-icon" />
                        </div>
                        <div className="sub-n-title">
                          <h4>Demo</h4>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="in-sub-container">
                    <div className="sub-page-heading">
                      <Link className="in-sub-page-heading" to="#">
                        <div className="mini-nav-icons">
                          <GoHome className="mini-nav-icon" />
                        </div>
                        <div className="sub-n-title">
                          <h4>Demo</h4>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav className="slider" style={{ width: "72px" }}>
          <div className="n-icon-container">
            <div className="n-icon-in-container">
              {navIconContainer.map((item, index) => (
                <div key={index} className="n-icon-container-title">
                  <div className="n-icon-page-heading">
                    <Link className="n-icon-in-page-heading" to={item.to}>
                      <div className="n-icon-nav-icons">
                        <item.lightIcon className="n-icon-nav-icon" />
                        {/* <GoHomeFill /> */}
                      </div>
                      {/* <div className="n-title">
                      <h4>Dashboard</h4>
                    </div> */}
                    </Link>
                  </div>
                </div>
              ))}

              {/* <div className="n-icon-container-title">
                <div className="n-icon-page-heading">
                  <Link className="n-icon-in-page-heading" to="/dashboard">
                    <div className="n-icon-nav-icons">
                      <GoHome className="n-icon-nav-icon" />
                      <GoHomeFill />
                    </div>
                    <div className="n-title">
                      <h4>Dashboard</h4>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="n-icon-container-title">
                <div className="n-icon-page-heading">
                  <Link className="n-icon-in-page-heading" to="/dashboard">
                    <div className="n-icon-nav-icons">
                      <IoPeopleOutline className="n-icon-nav-icon" />
                      <GoHomeFill />
                    </div>
                    <div className="n-title">
                      <h4>Dashboard</h4>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="n-icon-container-title">
                <div className="n-icon-page-heading">
                  <Link className="n-icon-in-page-heading" to="/dashboard">
                    <div className="n-icon-nav-icons">
                      <PiStudentLight className="n-icon-nav-icon" />
                      <GoHomeFill />
                    </div>
                    <div className="n-title">
                      <h4>Dashboard</h4>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="n-icon-container-title">
                <div className="n-icon-page-heading">
                  <Link className="n-icon-in-page-heading" to="/dashboard">
                    <div className="n-icon-nav-icons">
                      <PiChalkboardTeacherLight className="n-icon-nav-icon" />
                      <GoHomeFill />
                    </div>
                    <div className="n-title">
                      <h4>Dashboard</h4>
                    </div>
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
