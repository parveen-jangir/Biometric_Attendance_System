import React from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

function Header({ toggleSidebar }) {
  return (
    <header>
      <div className="h-container">
        <div className="left-container">
          <div className="menu-bar">
            <div className="in-menu-bar" onClick={toggleSidebar}>
              <IoMenu className="menu-icon" />
            </div>
          </div>
          <div className="h-main-logo">
            <Link className="h-logo" to="/dashboard">
              {/* <img src="" alt="Logo" /> */}
              <div className="h-title">
                <h1>
                  Biometric <span>Fingerprint Identification</span>
                </h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="right-container"></div>
      </div>
    </header>
  );
}

export default Header;
