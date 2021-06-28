import { useEffect } from "react";
import useInput from "../hooks/use-input";
import useSendData from "../hooks/use-sendData";

import classes from "./Input.module.css";

const Email = (props) => {
  const {
    enteredValue: emailInputValue,
    isTouched: emailIsTouched,
    deFocused: emailDeFocused,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput();

  const {
    inputIsValid: emailInputIsValid,
    errorResponse: emailErrorResponse,
    successResponse: success,
    sendInput,
  } = useSendData();

  const { onPassEmailData: passEmailData } = props;

  useEffect(() => {
    if (!emailIsTouched) {
      return;
    }
    const identifier = setTimeout(() => {
      sendInput(props.url, "email", emailInputValue);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsTouched, emailInputValue, sendInput]);

  useEffect(()=>{
    passEmailData({emailInputValue, emailInputIsValid});
  },[passEmailData, emailInputValue, emailInputIsValid,])

  const emailInputClasses =
    !emailInputIsValid && emailIsTouched
      ? `${classes["form-control"]} ${classes.invalid}`
      : classes["form-control"];

  return (
    <div className={emailInputClasses}>
      <label htmlFor="email">Your E-mail</label>
      <input
        type="email"
        id="email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={emailInputValue}
        placeholder="Email"
      />
      {emailErrorResponse && !emailDeFocused && (
        <p className={classes["info-text"]}>{emailErrorResponse}</p>
      )}
      {emailErrorResponse && emailDeFocused && (
        <p className={classes["error-text"]}>{emailErrorResponse}</p>
      )}
      {props.register &&  emailInputIsValid && (
        <p className={classes["valid-text"]}>{success.message}</p>
      )}
    </div>
  );
};

export default Email;
