import React, { useEffect, useState } from "react";
import Navbar from "../Common/Navbar";
import Header from "../Common/Header";
import { useSidebar } from "../../context/SidebarContext";
import { IoSearch } from "../../utils/icons";

const Students = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <Navbar isSidebarVisible={isSidebarVisible} />

      <div
        className={`content-wrapper ${isSidebarVisible ? "" : "full-width"}`}
      >
        <main>
          <section className="s-page">
            <div className="nav-title">Student Management</div>
            {/* <div className="page-filters">
              
              <div className="search-bar">
                <div className="search">
                  <input type="text" placeholder="Search name or branch" />
                  <div className="search-icon">
                    <IoSearch />
                  </div>
                </div>
              </div>

              <div className=""></div>

            </div> */}
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
          </section>
        </main>
      </div>
    </>
  );
};

export default Students;
