import { useEffect } from "react";
import useInput from "../../hooks/use-input";
import useSendData from "../../hooks/use-sendData";
import classes from "./Username.module.css";

const Username = (props) => {
  const {
    enteredValue: nameInputValue,
    isTouched: nameIsTouched,
    deFocused: nameDeFocused,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput();

  const {
    inputIsValid: nameInputIsValid,
    errorResponse: nameErrorResponse,
    successResponse: success,
    sendInput,
  } = useSendData();

  const { onPassNameData: passNameData } = props;

  useEffect(() => {
    if (!nameIsTouched) {
      return
    }
    const identifier = setTimeout(() => {
      sendInput(props.url, "username", nameInputValue);
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [nameInputValue, nameIsTouched, sendInput]);

  useEffect(()=>{
    passNameData({nameInputValue, nameInputIsValid});
  },[passNameData, nameInputValue, nameInputIsValid])

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
      {/* {!nameErrorResponse &&
        nameDeFocused &&
        nameInputValue.trim().length === 0 && (
          <p className={classes["error-text"]}>Usename can not be blank</p>
        )} */}
      {nameInputIsValid && (
        <p className={classes["valid-text"]}>{success.message}</p>
      )}
    </div>
  );
};

export default Username;
