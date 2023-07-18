import Layout from "../Layout";
import DataTransaksicomp from "./DataTransaksicomp";
import { useEffect, useState } from "react";
import axios from "axios";

const DataTransaksipage = () => {
  const [data, setData] = useState();
  const [kategori, setKategori] = useState();

  useEffect(() => {
    axios.get(` ${process.env.REACT_APP_API_URL}/transaksi/`).then((result) => {
      setData(result.data);
    });
    axios.get(`${process.env.REACT_APP_API_URL}/kategoriMenu`).then((result) => {
      setKategori(result.data.data);
      });
  }, []);

  return (
    <div>
      <Layout />
      {data && <DataTransaksicomp data={data} kategori={kategori} />}
    </div>
  );
};

export default DataTransaksipage;
