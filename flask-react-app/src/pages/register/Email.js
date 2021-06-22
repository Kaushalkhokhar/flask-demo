import { useEffect } from "react";
import useInput from "../../hooks/use-input";
import classes from "./Email.module.css";

const Email = (props) => {
  const url = '/add_user'
  const {
    enteredValue: emailInputValue,
    isTouched: emailIsTouched,
    deFocused: emailDeFocused,
    inputIsValid: emailInputIsValid,
    errorResponse: emailErrorResponse,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(url, "email");

  const { onPassEmailData: passEmailData } = props;

  useEffect(() => {
    passEmailData(
      
      emailReset,
      emailInputIsValid
    );
  }, [
    passEmailData,
    
    emailReset,
    emailInputIsValid,
  ]);

  const emailInputClasses = !emailInputIsValid && emailIsTouched
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
      {!emailErrorResponse &&
        emailDeFocused &&
        emailInputValue.trim().length === 0 && (
          <p className={classes["error-text"]}>Email can not be blank</p>
        )}
      {emailInputIsValid && (
        <p className={classes["valid-text"]}>Email is available</p>
      )}
    </div>
  );
};

export default Email;
