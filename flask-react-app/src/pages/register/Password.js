import { useEffect } from "react";
import useInput from "../../hooks/use-input";
import classes from "./Password.module.css";

const Password = (props) => {
  const url = "/add_user";
  const {
    enteredValue: passwordInputValue,
    isTouched: passwordIsTouched,
    deFocused: passwordDeFocused,
    inputIsValid: passwordInputIsValid,
    errorResponse: passwordErrorResponse,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(url, "password");

  const { onPassPasswordData: passPasswordData } = props;

  useEffect(() => {
    passPasswordData(passwordInputValue, passwordReset, passwordInputIsValid);
  }, [passPasswordData, passwordInputValue, passwordReset, passwordInputIsValid]);

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
      {!passwordErrorResponse &&
        passwordDeFocused &&
        passwordInputValue.trim().length === 0 && (
          <p className={classes["error-text"]}>Password can not be blank</p>
        )}
      {passwordInputIsValid && (
        <p className={classes["valid-text"]}>Password is available</p>
      )}
    </div>
  );
};

export default Password;
