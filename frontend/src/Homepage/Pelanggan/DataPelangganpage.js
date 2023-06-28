import Sidebarcomp from "../Sidebarcomp";
import DataPelanggancomp from "./DataPelanggancomp";
import { useEffect, useState } from "react";
import axios from "axios";

const DataPelangganpage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(` ${process.env.REACT_APP_API_URL}/customer/`).then((result) => {
      setData(result.data);
    });
  }, []);

  return (
    <div>
      <Sidebarcomp />
      {data && <DataPelanggancomp data={data} />}
    </div>
  );
};

export default DataPelangganpage;
