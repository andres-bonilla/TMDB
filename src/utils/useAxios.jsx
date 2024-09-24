import { useState, useEffect, useRef } from "react";
import axios from "axios";

export const useAxios = (params) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);

  const abortControlRef = useRef(new AbortController());

  const cancel = () => abortControlRef.current.abort();

  useEffect(() => {
    if (params.url) {
      axios
        .request({ ...params, signal: abortControlRef.current.signal })
        .then((res) => setData(res.data))
        .catch((error) => setErr(error))
        .finally(() => setLoading(false));
    }
  }, [params.url]);

  return { loading, data, err, cancel };
};
