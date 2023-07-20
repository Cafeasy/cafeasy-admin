import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Homepage/Topnav.css";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
const cookies = new Cookies();

const TopNav = () => {
  const params = useParams();
  const urlParams = params.idAdmin;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/profile/` + urlParams)
      .then((res) => setData(res.data.data));
  }, [data]);

  let arr = data.result ?? [];

  console.log(urlParams);

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
            <i>{arr[0]?.namaPemilikCafe}</i>
            {/* <Link to="/settings">
              <img src= {arr[0]?.imageUrl} alt="" />
            </Link> */}
            {/* <i>{}</i> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
