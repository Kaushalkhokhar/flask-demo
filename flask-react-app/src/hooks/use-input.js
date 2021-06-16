import { useState } from "react";

const useInput = (validate) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validate(enteredValue);
  const inputIsInvalid = !valueIsValid && isTouched;

  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('')
    setIsTouched(false)
  }

  return {
      enteredValue,
      valueIsValid,
      inputIsInvalid,
      inputChangeHandler,
      inputBlurHandler,
      reset,
  }
};

export default useInput;