import React, { useState } from "react";

const useHttp = (reqConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(reqConfig.url, {
        method: reqConfig.method || "GET",
        headers: reqConfig.headers || {},
        body: reqConfig.body || null,
      });

    //   console.log(response, "====");

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    fetchTasks,
  };
};

export default useHttp;
