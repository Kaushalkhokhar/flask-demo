import { useEffect } from "react";
import useInput from "../../hooks/use-input";
import useSendData from "../../hooks/use-sendData";

import classes from "./ResetEmail.module.css";

const ResetEmail = (props) => {
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
    sendInput,
  } = useSendData();

  const { onPassEmailData: passEmailData } = props;

  useEffect(() => {
    if (!emailIsTouched) {
      return;
    }
    const identifier = setTimeout(() => {
      sendInput("/reset_request", "email", emailInputValue);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [emailInputValue, emailIsTouched, sendInput]);

  useEffect(() => {
    passEmailData({ emailInputValue, emailInputIsValid });
  }, [passEmailData, emailInputValue, emailInputIsValid]);

  return (
    <div className={classes["form-control"]}>
      <label htmlFor="email">Enter Email</label>
      <input
        type="text"
        id="email"
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={emailInputValue}
        placeholder="Your Email"
      />
      {emailErrorResponse && !emailDeFocused && (
        <p className={classes["info-text"]}>{emailErrorResponse}</p>
      )}
      {emailErrorResponse && emailDeFocused && (
        <p className={classes["error-text"]}>{emailErrorResponse}</p>
      )}
    </div>
  );
};

export default ResetEmail;
