import { useEffect, useState } from "react";

const useFetch = (url, method = "GET") => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const postData = async (data) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    const fetchData = async (options) => {
      setIsLoading(true);

      try {
        const response = await fetch(url, { ...options });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const total = response.headers.get("X-Total-Count");
        if (total) {
          setTotalCount(Number(total));
        }

        const jsonObj = await response.json();
        setIsLoading(false);
        setData(jsonObj);
      } catch (error) {
        setIsLoading(false);
        setError(`Error: ${error.message}`);
      }
    };

    if (method === "GET") {
      fetchData();
    }

    if (method === "POST" && options) {
      fetchData(options);
    }
  }, [url, options, method]);

  return { data, isLoading, error, postData, totalCount };
};

export default useFetch;
