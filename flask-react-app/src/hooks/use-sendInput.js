import { useCallback, useState } from "react";

const useSendInput = (url, inputType, enteredValue=null) => {
  // Here inputType can be usernam, password, email, confirmPassword, submit etc.
  const [inputIsValid, setInputIsValid] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [successResponse, setSuccessResponse] = useState({})

  const sendInput = useCallback(async () => {
    setInputIsValid(false);
    setErrorResponse(false);
    setIsLoading(true)
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: enteredValue, type: inputType }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (error) {
          throw new Error(error.data.message);
        }
        throw new Error("Something went wrong. Please try again");
      }
      const success = await response.json()
      setSuccessResponse(success.data)
      setInputIsValid(true);
    } catch (err) {
      setErrorResponse(err.message);
      setInputIsValid(false);
      setSuccessResponse("")
    }
    setIsLoading(false)
  },[enteredValue, url, inputType]);
  
  const setValidation = useCallback((validation) => {
      setInputIsValid(validation)
  },[])

  const resetState = useCallback(() => {
    setInputIsValid(false)
    setErrorResponse(false)
    setIsLoading(false)
  },[])

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

export default useSendInput;
