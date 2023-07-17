import Layout from "../Layout";
import Bannercomp from "./Bannercomp";
import { useEffect, useState } from "react";
import axios from "axios";

const Bannerpage = () => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/banner/`).then((result) => {
        setData(result.data.data);
      })
  }, []);

  return (
    <div>
      <Layout />
      {data && <Bannercomp data={data} />}
    </div>
  );
};

export default Bannerpage;
