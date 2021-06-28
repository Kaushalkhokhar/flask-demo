import { useEffect } from "react";
import useSendData from "../hooks/use-sendData";
import useInput from "../hooks/use-input";

import classes from "./Input.module.css";

const Password = (props) => {
  const {
    enteredValue: passwordInputValue,
    isTouched: passwordIsTouched,
    deFocused: passwordDeFocused,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput();
  const {
    inputIsValid: passwordInputIsValid,
    errorResponse: passwordErrorResponse,
    successResponse: success,
    sendInput,
  } = useSendData();

  const { onPassPasswordData: passPasswordData } = props;

  useEffect(() => {
    if (!passwordIsTouched) {
      return
    }
    const identifier = setTimeout(() => { 
      sendInput(props.url, "password", passwordInputValue);
    }, 500);
    return ()=>{
      clearTimeout(identifier)
    }
  }, [passwordIsTouched, passwordInputValue, sendInput]);

  useEffect(()=>{
    passPasswordData({passwordInputValue, passwordInputIsValid});
  },[passPasswordData, passwordInputValue, passwordInputIsValid])

  const passwordInputClasses =
    !passwordInputIsValid && passwordIsTouched
      ? `${classes["form-control"]} ${classes.Valid}`
      : classes["form-control"];

  return (
    <div className={passwordInputClasses}>
      <label htmlFor="password">Your E-mail</label>
      <input
        type="password"
        id="password"
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        value={passwordInputValue}
        placeholder="Password"
      />
      {passwordErrorResponse && !passwordDeFocused && (
        <p className={classes["info-text"]}>{passwordErrorResponse}</p>
      )}
      {passwordErrorResponse && passwordDeFocused && (
        <p className={classes["error-text"]}>{passwordErrorResponse}</p>
      )}
      { props.register && passwordInputIsValid && (
        <p className={classes["valid-text"]}>{success.message}</p>
      )}
    </div>
  );
};

export default Password;
