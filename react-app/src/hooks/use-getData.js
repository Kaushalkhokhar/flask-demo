import { useCallback, useState } from "react";

const useGetData = (url, token = null, payload = null) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsScuccess] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setData({});
    setError(false);
    setIsScuccess(false);
    const response = await fetch(url, {
      headers: {
        "x-access-token": token,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        const error = await response.json();
        setError(error.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    } else {
      const success = await response.json();
      setData(success.data);
      setIsScuccess(true);
    }
    setIsLoading(false);
  }, [url, token]);

  const resetState = () => {
    setIsLoading(false);
    setIsScuccess(false);
    setError(false);
  };

  return {
    data,
    error,
    isLoading,
    isSuccess,
    fetchData,
    resetState,
  };
};

export default useGetData;
