import React, { useState, useEffect } from "react";
import "../Homepage/Sidebarpage.css";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link } from "react-router-dom";
import { Sidebardata } from "./Sidebardata";
import logodannama from "../Photos/logodannama.png";
import Dropdown from "../Utils/Dropdown";
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

  const [click, setClick] = useState(false);

  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  const [dropdown, setDropdown] = useState(false);

  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 800) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 800) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <>
        <header className="navbar">
          <div className="navbar__title navbar__item">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <div
            className="navbar__item"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link to="" className="nav-links" onClick={closeMobileMenu}>
              Muhammad Adam Firdaus
              <MdIcons.MdArrowDropDown />
              {dropdown && <Dropdown />}
            </Link>
          </div>
        </header>
      </>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <img src={logodannama} alt="Logo" />
            </Link>
          </li>
          <br></br>
          {Sidebardata.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </IconContext.Provider>
  );
}

export default Sidebarcomp;
