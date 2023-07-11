import React, { useState, useEffect } from "react";
import "../Homepage/Sidebarpage.css";
import * as BiIcons from "react-icons/bi";
import { Sidebardata } from "./Sidebardata";
import { NavLink } from "react-router-dom";
import logodannama from "../Photos/logodannama.png";
import "../Photos/logodannama.png";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";

function Sidebarcomp() {
  const cookies = new Cookies();
  const nextNavigate = useNavigate();

  useEffect(() => {
    if (!cookies.get("secretLogToken")) {
      nextNavigate("/LoginAdmin");
      return () => {};
    }
  }, []);

  // const [click, setClick] = useState(false);

  // const [sidebar, setSidebar] = useState(false);

  // const showSidebar = () => setSidebar(!sidebar);

  // const [dropdown, setDropdown] = useState(false);

  // const closeMobileMenu = () => setClick(false);

  // const onMouseEnter = () => {
  //   if (window.innerWidth < 800) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(true);
  //   }
  // };
  // const onMouseLeave = () => {
  //   if (window.innerWidth < 800) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(false);
  //   }
  // };
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <>
        <nav className="sidebar">
          <br></br>
          <ul className="sidebar-top sidebar-bg">
            <li className="sidebar-toggle">
                <img src={logodannama} alt="Logo" />
            </li>
          </ul>

          <div className="sidebar-content">
            <div className="menu">
              <ul className="nav-list">
                {Sidebardata.map((item, index) => (
                  <li className={item.cName} key={index}>
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive
                          ? "nav-active nav-link"
                          : "nav-link"
                      }
                    >
                      {item.icon}
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-bottom">
              <span>
                <BiIcons.BiLogOut />Logout
              </span>
            </div>
          </div>
        </nav>
      </>
    </IconContext.Provider>
  );
}

export default Sidebarcomp;
