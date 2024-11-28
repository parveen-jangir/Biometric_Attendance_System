import React, { useEffect, useState } from "react";
import Navbar from "./Common/Navbar";
import Header from "./Common/Header";
import { useSidebar } from "../context/SidebarContext";

const Timetable = () => {
  const { isSidebarVisible, toggleSidebar } = useSidebar();

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <Navbar isSidebarVisible={isSidebarVisible} />

      <div
        className={`content-wrapper ${isSidebarVisible ? "" : "full-width"}`}
      >
        <main>
          <div>Timetable</div>
        </main>
      </div>
    </>
  );
};

export default Timetable;
