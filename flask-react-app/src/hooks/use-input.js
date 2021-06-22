import { useCallback, useEffect, useState } from "react";
import useSendInput from "./use-sendInput";

const useInput = (url, inputType, validateConfPassword=null) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [deFocused, setDeFocused] = useState(false);
  const {inputIsValid, errorResponse, sendInput, setValidation, resetState} = useSendInput(url, inputType, enteredValue)
  // const [inputIsValid, setInputIsValid] = useState(false);
  // const [errorResponse, setErrorResponse] = useState(false);

  useEffect(() => {
    if (!isTouched) {
      console.log("is touched runnnig...");
      return;
    }

    const identifier = setTimeout(()=>{
      console.log("use-input running...");

      if (inputType === "confirmPassword") {
        const validationFlag = validateConfPassword(enteredValue)
        setValidation(validationFlag)
      }
      else {
        sendInput();
      }
    },500)

    return () => {
      clearTimeout(identifier)
    }
  }, [enteredValue, isTouched, sendInput, setValidation, inputType, validateConfPassword]);

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true); // this is for validation on every key stroke
    // if we want on blur only this can be removed
    setDeFocused(false);
  };

  //  this can be added if we want to check validation on blur
  const inputBlurHandler = () => {
    setIsTouched(true);
    setDeFocused(true);
  };

  const reset = useCallback(() => {
    setEnteredValue("");
    setIsTouched(false);
    setDeFocused(false)
    resetState()
  }, [resetState]);

  return {
    enteredValue,
    isTouched,
    deFocused,
    inputIsValid,
    errorResponse,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
