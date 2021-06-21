import { useCallback, useEffect, useState } from "react";
import useInput from "../../hooks/use-input";
import classes from "./Username.module.css";

const Username = (props) => {
  const url = "/add_user";
  const {
    enteredValue: nameInputValue,
    isTouched: nameIsTouched,
    deFocused: nameDeFocused,
    errorResponse: nameErrorResponse,
    inputIsValid: nameInputIsValid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(url, "username");

  const { onPassNameData: passNameData } = props;

  useEffect(() => {
    if (!nameInputIsValid) {
      return;
    }
    passNameData(nameInputValue, nameReset, nameInputIsValid);
  }, [passNameData, nameInputValue, nameReset, nameInputIsValid]);

  const nameInputClasses =
    !nameInputIsValid && nameIsTouched 
      ? `${classes["form-control"]} ${classes.invalid}`
      : classes["form-control"];

  return (
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
      {nameErrorResponse && !nameDeFocused && (
        <p className={classes["info-text"]}>{nameErrorResponse}</p>
      )}
      {nameErrorResponse && nameDeFocused && (
        <p className={classes["error-text"]}>{nameErrorResponse}</p>
      )}
      {!nameErrorResponse &&
        nameDeFocused &&
        nameInputValue.trim().length === 0 && (
          <p className={classes["error-text"]}>Usename can not be blank</p>
        )}
      {nameInputIsValid && (
        <p className={classes["valid-text"]}>Username is available</p>
      )}
    </div>
  );
};

export default Username;
