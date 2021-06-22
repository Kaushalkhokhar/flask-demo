import { useEffect } from "react";
import useInput from "../../hooks/use-input";
import classes from "./ConfPassword.module.css";

const ConfPassword = (props) => {
  const validateConfPassword = (value) => {
    const isMatched = props.passwordInputValue === value;
    return isMatched;
  };
  const url = "/add_user";
  const {
    enteredValue: confPasswordInputValue,
    isTouched: confPasswordIsTouched,
    deFocused: confPasswordDeFocused,
    inputIsValid: confPasswordInputIsValid,
    inputChangeHandler: confPasswordChangeHandler,
    inputBlurHandler: confPasswordBlurHandler,
    reset: confPasswordReset,
  } = useInput(url, "confirmPassword", validateConfPassword);

  const { onPassConfPasswordData: passConfPasswordData } = props;

  useEffect(() => {
    passConfPasswordData(confPasswordReset, confPasswordInputIsValid);
  }, [passConfPasswordData, confPasswordReset, confPasswordInputIsValid]);

  const confPasswordInputClasses =
    !confPasswordInputIsValid && confPasswordIsTouched
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
        !confPasswordInputIsValid && (
          <p className={classes["info-text"]}>
            Password and confirm password must be same
          </p>
        )}
      {confPasswordDeFocused &&
        confPasswordIsTouched &&
        !confPasswordInputIsValid && (
          <p className={classes["error-text"]}>
            Password and confirm password must be same
          </p>
        )}
      {confPasswordInputIsValid && (
        <p className={classes["valid-text"]}>
          Password and confirm password matched.
        </p>
      )}
    </div>
  );
};

export default ConfPassword;
