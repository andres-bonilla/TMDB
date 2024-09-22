import { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = (params) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .request(params)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => setErr(error))
      .finally(() => setLoading(false));
  }, [params.url]);

  return { loading, data, err };
};
