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

  var secretLogToken = cookies.get("secretLogToken");
  var decoded = jwt_decode(secretLogToken);
  var decodedIdAdmin = decoded.idAdmin;

  console.log(decoded);
  const Sidebardata = [
    {
      path: "/ProfileAdmin/" + decodedIdAdmin,
      icon: <ImIcons.ImProfile />,
      cName: "sidebar-text",
      display: "Profil Admin",
    },
    {
      path: "/DataMenu",
      icon: <MdIcons.MdMenuBook />,
      cName: "sidebar-text",
      display: "Data Menu",
    },
    {
      path: "/DataTransaksi",
      icon: <AiIcons.AiOutlineTransaction />,
      cName: "sidebar-text",
      display: "Data Transaksi",
    },
    {
      path: "/DataPelanggan",
      icon: <HiIcons.HiUserGroup />,
      cName: "sidebar-text",
      display: "Data Pelanggan",
    },
    {
      path: "/DataKategori",
      icon: <BiIcons.BiCategory />,
      cName: "sidebar-text",
      display: "Data Kategori",
    },
    {
      path: "/DataBanner",
      icon: <FaIcons.FaImages />,
      cName: "sidebar-text",
      display: "Data Banner",
    },
  ];
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
          <ul className="sidebar-list">
            {Sidebardata.map((item, index) => (
              <li className={item.cName} key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive
                      ? "sidebar-active sidebar-link"
                      : "sidebar-link"
                  }
                >
                  {item.icon}
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>

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
