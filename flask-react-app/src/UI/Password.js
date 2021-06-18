import { useEffect } from "react";
import useInput from "../hooks/use-input";
import classes from "../components/users/UserForm.module.css";

const Password = (props) => {
  let passwordLength = 0;
  const validatePassword = (value) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    passwordLength = value.trim().length;
    return re.test(value) && passwordLength >= 8;
  };

  const {
    enteredValue: passwordInputValue,
    isTouched: passwordIsTouched,
    deFocused: passwordDeFocused,
    valueIsValid: passwordIsValid,
    inputIsInvalid: passwordInputIsInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(validatePassword);

  const { onPassPasswordData: passPasswordData } = props;

  useEffect(() => {
    passPasswordData(passwordInputValue, passwordIsValid, passwordReset, passwordInputIsInvalid);
  }, [
    passPasswordData,
    passwordInputValue,
    passwordIsValid,
    passwordReset,
    passwordInputIsInvalid,
  ]);
  
  const passwordInputClasses = passwordInputIsInvalid
    ? `${classes["form-control"]} ${classes.invalid}`
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
      {!passwordDeFocused && passwordIsTouched && passwordInputIsInvalid && (
        <p className={classes["info-text"]}>
          Password must be of 8 character should include special character(i.e
          @/#/$/% etc.), a-z, A-Z and 0-9.{" "}
          <strong>
            <em>i.e Example@1234</em>
          </strong>
        </p>
      )}
      {passwordDeFocused && passwordIsTouched && passwordInputIsInvalid && (
        <p className={classes["error-text"]}>
          Password must be of 8 character should include special character(i.e
          @/#/$/% etc.), a-z, A-Z and 0-9.{" "}
          <strong>
            <em>i.e Example@1234</em>
          </strong>
        </p>
      )}
      {!passwordInputIsInvalid &&
        passwordIsTouched &&
        passwordLength >= 8 &&
        passwordLength <= 9 && (
          <p className={classes["valid-text"]}>Strong password</p>
        )}
      {!passwordInputIsInvalid && passwordIsTouched && passwordLength >= 10 && (
        <p className={classes["valid-text"]}>Very strong password</p>
      )}
    </div>
  );
};

export default Password;
