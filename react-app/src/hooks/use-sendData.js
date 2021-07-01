import { useCallback, useState } from "react";

const useSendData = () => {
  const [inputIsValid, setInputIsValid] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successResponse, setSuccessResponse] = useState({});
  
  // Here inputType can be usernam, password, email, confirmPassword, submit etc.
  const sendInput = useCallback(async (url, inputType, enteredValue = null) => {
    setInputIsValid(false);
    setErrorResponse(false);
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: enteredValue, type: inputType }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          const error = await response.json();
          throw new Error(error.data.message);
        } else {
          throw new Error("Something went wrong. Please try again");
        }
      }
      const success = await response.json();
      setSuccessResponse(success.data);
      setInputIsValid(true);
    } catch (err) {
      setErrorResponse(err.message);
      setInputIsValid(false);
      setSuccessResponse("");
    }
    setIsLoading(false);
  }, []);

  const setValidation = useCallback((validation) => {
    setInputIsValid(validation);
  }, []);

  const resetState = useCallback(() => {
    setInputIsValid(false);
    setErrorResponse(false);
    setIsLoading(false);
  }, []);

  return {
    inputIsValid,
    errorResponse,
    isLoading,
    successResponse,
    sendInput,
    setValidation,
    resetState,
  };
};

export default useSendData;
