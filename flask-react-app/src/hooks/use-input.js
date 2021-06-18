import { useCallback, useState } from "react";

const useInput = (validate) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const [deFocused, setDeFocused] = useState(false);

  const valueIsValid = validate(enteredValue);
  const inputIsInvalid = !valueIsValid && isTouched;
  
  const inputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
    setIsTouched(true) // this is for validation on every key stroke
    // if we want on blur only this can be removed
    setDeFocused(false)
  };

  //  this can be added if we want to check validation on blur
  const inputBlurHandler = () => {
    setIsTouched(true);
    setDeFocused(true)
  };

  const reset = useCallback(() => {
    setEnteredValue('')
    setIsTouched(false)
  },[])

  return {
      enteredValue,
      isTouched,
      deFocused,
      valueIsValid,
      inputIsInvalid,
      inputChangeHandler,
      inputBlurHandler,
      reset,
  }
};

export default useInput;