import React, { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = (params, withControl) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (params.url) {
      const axiosCall = (req) =>
        axios
          .request(req)
          .then((res) => setData(res.data))
          .then(() => setLoading(false))
          .catch((error) => setErr(error));

      if (withControl) {
        const abortControl = new AbortController();
        axiosCall({ ...params, signal: abortControl.signal });
        return () => abortControl.abort();
      }

      axiosCall(params);
    }
  }, [params.url]);

  return { loading, data, err };
};
