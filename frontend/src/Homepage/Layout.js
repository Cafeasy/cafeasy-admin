import React from "react";
import Sidebarcomp from "./Sidebarcomp";
import Topnav from "./Topnav";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebarcomp />
      <div className="main__layout">
        <Topnav />
      </div>
    </div>
  );
};

export default Layout;
