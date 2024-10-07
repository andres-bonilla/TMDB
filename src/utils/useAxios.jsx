import React, { useState, useEffect } from "react";
import axios from "axios";

export const useAxios = (config, withControl) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (config.url) {
      const axiosCall = (req) =>
        axios
          .request(req)
          .then((res) => setData(res.data))
          .then(() => setLoading(false))
          .catch((error) => setErr(error));

      if (withControl) {
        const abortControl = new AbortController();
        axiosCall({ ...config, signal: abortControl.signal });
        return () => abortControl.abort();
      }

      axiosCall(config);
    }
  }, [config.url]);

  return { loading, data, err };
};
