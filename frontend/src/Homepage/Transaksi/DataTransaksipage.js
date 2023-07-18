import Layout from "../Layout";
import DataTransaksicomp from "./DataTransaksicomp";
import { useEffect, useState } from "react";
import axios from "axios";

const DataTransaksipage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(` ${process.env.REACT_APP_API_URL}/transaksi/`).then((result) => {
      setData(result.data.data);
    });
  }, []);

  return (
    <div>
      <Layout />
      {data && <DataTransaksicomp data={data} />}
    </div>
  );
};

export default DataTransaksipage;
