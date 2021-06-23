import { useContext, useEffect, Fragment } from "react";
import useInput from "../../hooks/use-input";
import AuthContext from "../../store/auth-context";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

import useSendInput from "../../hooks/use-sendInput";
import classes from "./Login.module.css";

const Login = () => {
  const ctx = useContext(AuthContext);
  const url = "/login_user";
  const {
    errorResponse: error,
    inputIsValid: isSuccess,
    successResponse,
    sendInput,
    resetState,
  } = useSendInput(url, "submit");

  const {
    enteredValue: emailValue,
    deFocused: emailDeFocused,
    inputIsValid: emailValueIsValid,
    errorResponse: emailErrorResponse,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(url, "email");

  const {
    enteredValue: passwordValue,
    deFocused: passwordDeFocused,
    inputIsValid: passwordValueIsValid,
    errorResponse: passwordErrorResponse,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(url, "password");

  let formIsValid = false;

  if (emailValueIsValid && passwordValueIsValid) {
    formIsValid = true;
  }

  const { tokenHandler, token } = ctx 
  useEffect(()=>{
    if (token) {
      return
    }
    tokenHandler(successResponse.payload)
  },[successResponse, tokenHandler, token])

  const submitHandler = (event) => {
    event.preventDefault();

    // This need only when we don't disable submit button
    // if (!emailValueIsValid || !passwordInputIsValid) {
    //   return;
    // }

    sendInput();
    if(!error) {
      emailReset()
      passwordReset()
    }
  };

  const modalClickHandler = () => {
    resetState()
  }
  
  return (
    <Fragment>
    <Card className={classes.form}>
      <form onSubmit={submitHandler}>
        <div className={classes["form-control"]}>
          <label htmlFor="email">Enter Email</label>
          <input
            type="text"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            value={emailValue}
            placeholder="Your Email"
          />
          {emailErrorResponse && !emailDeFocused && (
            <p className={classes["info-text"]}>{emailErrorResponse}</p>
          )}
          {emailErrorResponse && emailDeFocused && (
            <p className={classes["error-text"]}>{emailErrorResponse}</p>
          )}
        </div>
        <div className={classes["form-control"]}>
          <label htmlFor="password">Enter password</label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            value={passwordValue}
            placeholder="Your Password"
          />
          {passwordErrorResponse && !passwordDeFocused && (
            <p className={classes["info-text"]}>{passwordErrorResponse}</p>
          )}
          {passwordErrorResponse && passwordDeFocused && (
            <p className={classes["error-text"]}>{passwordErrorResponse}</p>
          )}
        </div>
        <Button type="submit" disabled={!formIsValid}>
          Login
        </Button>
      </form>
    </Card>
    {isSuccess && (
      <Modal
        onClick={modalClickHandler}
        title={"Success Message"}
        content={successResponse.message}
      />
    )}
    </Fragment>
  );
};

export default Login;
