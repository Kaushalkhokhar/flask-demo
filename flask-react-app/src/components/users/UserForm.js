import useInput from "../../hooks/use-input";

import classes from "./UserForm.module.css";

const UserForm = (props) => {
  const validateName = (value) => {
    const re = /^[a-zA-Z0-9]+$/;
    return re.test(value);
  };

  const validateEmail = (value) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
  };

  const validatePassword = (value) => {
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(value);
  };

  const validateConfPassword = (value) => {
    const isMatched = passwordInputValue === value;
    return isMatched;
  };

  const {
    enteredValue: nameInputValue,
    valueIsValid: nameIsValid,
    inputIsInvalid: nameInputIsInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(validateName);

  const {
    enteredValue: emailInputValue,
    valueIsValid: emailIsValid,
    inputIsInvalid: emailInputIsInvalid,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(validateEmail);

  const {
    enteredValue: passwordInputValue,
    valueIsValid: passwordIsValid,
    inputIsInvalid: passwordInputIsInvalid,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(validatePassword);

  const {
    enteredValue: confPasswordInputValue,
    valueIsValid: confPasswordIsValid,
    inputIsInvalid: confPasswordInputIsInvalid,
    inputChangeHandler: confPasswordChangeHandler,
    inputBlurHandler: confPasswordBlurHandler,
    reset: confPasswordReset,
  } = useInput(validateConfPassword);

  let formIsValid = false;

  if (nameIsValid && emailIsValid && passwordIsValid && confPasswordIsValid) {
    formIsValid = true;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (
      nameInputIsInvalid ||
      emailInputIsInvalid ||
      passwordInputIsInvalid ||
      confPasswordInputIsInvalid
    ) {
      return;
    }
    nameReset();
    emailReset();
    passwordReset();
    confPasswordReset();
  };

  const nameInputClasses = nameInputIsInvalid
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const emailInputClasses = emailInputIsInvalid
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const passwordInputClasses = passwordInputIsInvalid
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  const confPasswordInputClasses = confPasswordInputIsInvalid
    ? `${classes["form-control"]} ${classes.invalid}`
    : classes["form-control"];

  return (
    <form onSubmit={onSubmitHandler} className={classes.form}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={nameInputValue}
          placeholder="Username"
        />
        {nameInputIsInvalid && (
          <p className={classes["error-text"]}>Please enter some text.</p>
        )}
      </div>
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
        {emailInputIsInvalid && (
          <p className={classes["error-text"]}>
            Please enter valid email address.
          </p>
        )}
      </div>
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
        {passwordInputIsInvalid && (
          <p className={classes["error-text"]}>
            Password must be of min 8 letter, with at least a symbol, upper and
            lower case letters and a number.
          </p>
        )}
      </div>
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
        {confPasswordInputIsInvalid && (
          <p className={classes["error-text"]}>
            Password and confirm password not matched.
          </p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default UserForm;
