import Update from "./Update";
import { useEffect, useState } from "react";
import axios from "axios";

const DataMenupage = () => {
  const params = useParams();
  const urlParams = params.idAdmin;
  const [data, setData] = useState();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/menu` + urlParams).then((result) => {
      setData(result.data.data);
    });
  }, []);

  return <div>{data && <Update data={data} />}</div>;
};

export default DataMenupage;
