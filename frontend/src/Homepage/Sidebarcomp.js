import React, { useState, useEffect } from "react";
import "../Homepage/Sidebarpage.css";
import axios from "axios";
import * as ImIcons from "react-icons/im";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as BiIcons from "react-icons/bi";
import * as FaIcons from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logodannama from "../Photos/logodannama.png";
import "../Photos/logodannama.png";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
function Sidebarcomp() {
  const cookies = new Cookies();
  const nextNavigate = useNavigate();

  var secretLogToken = cookies.get("secretLogToken");
  var decoded = jwt_decode(secretLogToken);
  var decodedIdAdmin = decoded.idAdmin;

  const Sidebardata = [
    {
      path: "/ProfileAdmin/" + decodedIdAdmin,
      icon: <ImIcons.ImProfile />,
      cName: "nav-text",
      display: "Profil Admin",
    },
    {
      path: "/DataMenu",
      icon: <MdIcons.MdMenuBook />,
      cName: "nav-text",
      display: "Data Menu",
    },
    {
      path: "/DataTransaksi",
      icon: <AiIcons.AiOutlineTransaction />,
      cName: "nav-text",
      display: "Data Transaksi",
    },
    {
      path: "/DataPelanggan",
      icon: <HiIcons.HiUserGroup />,
      cName: "nav-text",
      display: "Data Pelanggan",
    },
    {
      path: "/DataKategori",
      icon: <BiIcons.BiCategory />,
      cName: "nav-text",
      display: "Data Kategori",
    },
    {
      path: "/DataBanner",
      icon: <FaIcons.FaImages />,
      cName: "nav-text",
      display: "Data Banner",
    },
  ];

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

  // const logout = (e) => {
  //   cookies.remove("Token");
  //   window.location.href = "/";
  //   return false;
  // };

  const logout = () => {
    cookies.remove("secretLogToken");
    window.location.href = "http://localhost:3000/LoginAdmin";
  };
  return (
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
                      navClass.isActive ? "nav-active nav-link" : "nav-link"
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
            <span onClick={logout}>
              <BiIcons.BiLogOut />
              Logout
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebarcomp;
