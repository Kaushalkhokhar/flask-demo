import { useEffect } from "react";
import useInput from '../../hooks/use-input';
import classes from "./Username.module.css";

const Username = (props) => {
  let userNotExist = true;
  let username_length = 0;
  const validateName = (value) => {
    const re = /^[a-zA-Z0-9]+$/;
    for (const user in props.currenteUsers) {
      if (props.currenteUsers[user].username === value) {
        userNotExist = false;
      }
    }
    username_length = value.trim().length;
    return re.test(value) && userNotExist && username_length > 7;
  };

  const {
    enteredValue: nameInputValue,
    // isTouched: nameIsTouched,
    deFocused: nameDeFocused,
    valueIsValid: nameIsValid,
    inputIsInvalid: nameInputIsInvalid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(validateName);

  const { onPassNameData: passNameData } = props;

  useEffect(() => {
    passNameData(nameInputValue, nameIsValid, nameReset, nameInputIsInvalid);
  }, [
    passNameData,
    nameInputValue,
    nameIsValid,
    nameReset,
    nameInputIsInvalid,
  ]);

  const nameInputClasses = nameInputIsInvalid
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
      {!nameDeFocused && username_length <= 7 && username_length > 0 && (
        <p className={classes["info-text"]}>
          Username should be atleast six character long
        </p>
      )}
      {nameDeFocused && username_length <= 7 && username_length > 0 && (
        <p className={classes["error-text"]}>
          Username should be atleast six character long
        </p>
      )}
      {nameInputIsInvalid && userNotExist && username_length === 0 && (
        <p className={classes["error-text"]}>
          Username can not be blank. Please enter some text
        </p>
      )}
      {nameInputIsInvalid && !userNotExist && username_length > 7 && (
        <p className={classes["error-text"]}>
          Username is not availabel.Please enter some other value
        </p>
      )}
      {!nameInputIsInvalid && username_length > 7 && (
        <p className={classes["valid-text"]}>Username is available</p>
      )}
    </div>
  );
};

export default Username;
