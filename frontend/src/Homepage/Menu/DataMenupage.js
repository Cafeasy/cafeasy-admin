import Layout from "../Layout";
import DataMenucomp from "./DataMenucomp";
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
      <Layout />
      {data && <DataMenucomp data={data} />}
    </div>
  );
};

export default DataMenupage;
