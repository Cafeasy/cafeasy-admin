import Layout from "../Layout";
import DataMenucomp from "./DataMenucomp";
import { useEffect, useState } from "react";
import axios from "axios";

const DataMenupage = () => {
  const [data, setData] = useState();
  const [kategori, setKategori] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/menu`).then((result) => {
      setData(result.data.data);
    });
    axios
      .get(`${process.env.REACT_APP_API_URL}/kategoriMenu`)
      .then((result) => {
        setKategori(result.data.data);
      });
  }, []);

  return (
    <div>
      <Layout />

      {data && <DataMenucomp data={data} kategori={kategori} />}
    </div>
  );
};

export default DataMenupage;
