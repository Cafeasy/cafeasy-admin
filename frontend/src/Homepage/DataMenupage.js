import { NavLink } from "react-router-dom";
import Sidebarcomp from "../Homepage/Sidebarcomp";
import DataMenucomp from "../Homepage/DataMenucomp";
import { useEffect, useState } from "react";
import axios from "axios";

const DataMenupage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/menu`).then((result) => {
      setData(result.data);
    });
  }, []);

  return (
    <div>
      <Sidebarcomp />
      {data && <DataMenucomp data={data} />}
    </div>
  );
};

export default DataMenupage;
