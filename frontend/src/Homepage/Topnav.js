import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../Homepage/Topnav.css";

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


  return (
    <div className="topnav">
      <div className="topnav-wrapper">
        <div className="search__box"></div>
        <div className="topnav-right">
          <div className="profil">
            <i>{arr[0]?.namaPemilikCafe}</i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
