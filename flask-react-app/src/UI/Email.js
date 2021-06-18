import { useEffect } from "react";
import useInput from "../hooks/use-input";
import classes from "../components/users/UserForm.module.css";

const Email = (props) => {
  let emailNotExist = true;
  const validateEmail = (value) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    for (const user in props.currenteUsers) {
      if (props.currenteUsers[user].email === value) {
        emailNotExist = false;
      }
    }
    // return re.test(value) && emailNotExist;
    return re.test(value) && emailNotExist;
  };

  const {
    enteredValue: emailInputValue,
    isTouched: emailIsTouched,
    deFocused: emailDeFocused,
    valueIsValid: emailIsValid,
    inputIsInvalid: emailInputIsInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(validateEmail);

  const { onPassEmailData: passEmailData } = props;

  useEffect(() => {
    passEmailData(
      emailInputValue,
      emailIsValid,
      emailReset,
      emailInputIsInvalid
    );
  }, [
    passEmailData,
    emailInputValue,
    emailIsValid,
    emailReset,
    emailInputIsInvalid,
  ]);

  const emailInputClasses = emailInputIsInvalid
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
      {!emailDeFocused &&
        emailIsTouched &&
        emailInputIsInvalid &&
        emailNotExist && (
          <p className={classes["info-text"]}>
            Email should be like. i.e example@demo.com
          </p>
        )}
      {emailDeFocused && emailInputIsInvalid && emailNotExist && (
        <p className={classes["error-text"]}>
          Email should be like. i.e example@demo.com
        </p>
      )}
      {emailInputIsInvalid && !emailNotExist && emailIsTouched && (
        <p className={classes["error-text"]}>
          Email address is not avalilable. Please enter some other values.
        </p>
      )}
      {!emailInputIsInvalid && emailNotExist && emailIsTouched && (
        <p className={classes["valid-text"]}>Email address is avalilable.</p>
      )}
    </div>
  );
};

export default Email;
