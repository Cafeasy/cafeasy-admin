import Layout from "../Layout";
import DataKategoricomp from "./DataKategoricomp";
import { useEffect, useState } from "react";
import axios from "axios";

const DataKategoripage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(` ${process.env.REACT_APP_API_URL}/kategoriMenu/`).then((result) => {
        setData(result.data.data);
      });
  }, []);

  return (
    <div>
      <Layout />
      {data && <DataKategoricomp data={data} />}
    </div>
  );
};

export default DataKategoripage;
