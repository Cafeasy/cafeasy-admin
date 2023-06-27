import { NavLink } from "react-router-dom";
import Sidebarcomp from "../Homepage/Sidebarcomp";
import DataPelanggancomp from "../Homepage/DataPelanggancomp";
import { useEffect, useState } from "react";
import axios from "axios";

const DataPelangganpage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/customer/`)
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Sidebarcomp />
      {data && <DataPelanggancomp data={data} />}
    </div>
  );
};

export default DataPelangganpage;
