import { useEffect } from "react";
import useInput from "../../hooks/use-input";
import classes from "./ConfPassword.module.css";

const ConfPassword = (props) => {
  let confPasswordLength = 0;
  const validateConfPassword = (value) => {
    const isMatched = props.passwordInputValue === value;
    confPasswordLength = value.trim().length;
    return isMatched;
  };

  const {
    enteredValue: confPasswordInputValue,
    isTouched: confPasswordIsTouched,
    deFocused: confPasswordDeFocused,
    valueIsValid: confPasswordIsValid,
    inputIsInvalid: confPasswordInputIsInvalid,
    inputChangeHandler: confPasswordChangeHandler,
    inputBlurHandler: confPasswordBlurHandler,
    reset: confPasswordReset,
  } = useInput(validateConfPassword);

  const { onPassConfPasswordData: passConfPasswordData } = props;

  useEffect(() => {
    passConfPasswordData(
      confPasswordInputValue,
      confPasswordIsValid,
      confPasswordReset,
      confPasswordInputIsInvalid
    );
  }, [
    passConfPasswordData,
    confPasswordInputValue,
    confPasswordIsValid,
    confPasswordReset,
    confPasswordInputIsInvalid,
  ]);

  const confPasswordInputClasses = confPasswordInputIsInvalid
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  return (
    <div className={confPasswordInputClasses}>
      <label htmlFor="confPassword">Your E-mail</label>
      <input
        type="password"
        id="confPassword"
        onChange={confPasswordChangeHandler}
        onBlur={confPasswordBlurHandler}
        value={confPasswordInputValue}
        placeholder="Confirm Password"
      />
      {!confPasswordDeFocused &&
        confPasswordIsTouched &&
        confPasswordInputIsInvalid && (
          <p className={classes["info-text"]}>
            Password and confirm password must be same
          </p>
        )}
      {confPasswordDeFocused &&
        confPasswordIsTouched &&
        confPasswordInputIsInvalid &&
        confPasswordLength > 0 && (
          <p className={classes["error-text"]}>
            Password and confirm password must be same
          </p>
        )}
      {!confPasswordInputIsInvalid && confPasswordIsTouched && confPasswordLength > 0 && (
        <p className={classes["valid-text"]}>
          Password and confirm password matched.
        </p>
      )}
    </div>
  );
};

export default ConfPassword;
