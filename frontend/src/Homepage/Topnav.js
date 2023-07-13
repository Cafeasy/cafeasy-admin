import React from "react";

import { Link } from "react-router-dom";
import "../Homepage/Topnav.css";

const TopNav = () => {
  return (
    <div className="top__nav">
      <div className="top__nav-wrapper">
        <div className="search__box"></div>
        <div className="top__nav-right">
          <span className="notification">
            <i class="ri-notification-3-line"></i>
            <span className="badge"></span>
          </span>
          <div className="profile">
            {/* <Link to="/settings">
              <img src={profileImg} alt="" />
            </Link> */}
            <i>Muhammad Adam Firdaus</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
