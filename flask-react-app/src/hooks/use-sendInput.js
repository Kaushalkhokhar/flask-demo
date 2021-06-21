import { useCallback, useState } from "react";

const useSendInput = (enteredValue, url, inputType) => {
  const [inputIsValid, setInputIsValid] = useState(false);
  const [errorResponse, setErrorResponse] = useState(false);

  const sendInput = useCallback(async () => {
    setInputIsValid(false);
    setErrorResponse(false);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputValue: enteredValue, type: inputType }),
      });

      if (!response.ok) {
        const error = await response.json();
        if (error.message) {
          throw new Error(error.message);
        }
        throw new Error("Something went wrong. Please try again");
      }
      console.log("runnning");
      setInputIsValid(true);
    } catch (err) {
      setErrorResponse(err.message);
      setInputIsValid(false);
    }
  },[enteredValue, url, inputType]);
  
  const setValidation = useCallback((validation) => {
      setInputIsValid(validation)
  },[])

  return {
    inputIsValid,
    errorResponse,
    sendInput,
    setValidation,
  };
};

export default useSendInput;
