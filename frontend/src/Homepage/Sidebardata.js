import React from "react";
import { useState, useEffect } from "react";
import * as MdIcons from "react-icons/md";
import * as CgIcons from "react-icons/cg";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as BiIcons from "react-icons/bi";
// import { useParams } from "react-router-dom";

// let url = useParams();
export const Sidebardata = [
  {
    path: "/ProfileAdmin/:idadmin",
    icon: <CgIcons.CgProfile />,
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
];
