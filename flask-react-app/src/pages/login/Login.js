import { useContext, useEffect, Fragment, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import LoadingSpinner from "../../UI/LoadingSpinner";
import LoginEmail from "./LoginEmail";
import LoginPassword from "./LoginPassword";

import useSendData from "../../hooks/use-sendData";
import classes from "./Login.module.css";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory()
  const ctx = useContext(AuthContext);
  const [emailData, setEmailData] = useState({});
  const [passwordData, setPasswordData] = useState({});
  
  const {
    errorResponse: error,
    successResponse,
    isLoading,
    sendInput,
    resetState,
  } = useSendData();
  
  const passEmailData = useCallback((data) => {
    setEmailData(data);
  },[]);
  
  const passPasswordData = useCallback((data) => {
    setPasswordData(data);
  },[]);
  
  let formIsValid = false;
  
  if (emailData.emailInputIsValid && passwordData.passwordInputIsValid) {
    formIsValid = true;
  }
  
  const { token, tokenHandler } = ctx;
  useEffect(() => {
    if (token) {
      history.push('/home')
      return;
    }
    tokenHandler(successResponse.payload);
  }, [successResponse, token, history, tokenHandler]);

  const submitHandler = (event) => {  
    event.preventDefault();

    // This need only when we don't disable submit button
    // if (!emailValueIsValid || !passwordInputIsValid) {
    //   return;
    // }
    const userData = {
      email: emailData.emailInputValue,
      password: passwordData.passwordInputValue
    }
    sendInput('/login', "submit", userData);
  };

  const modalClickHandler = () => {
    resetState();
  };

  return (
    <Fragment>
      {!isLoading && (
        <Card className={classes.form}>
          <form onSubmit={submitHandler}>
            <LoginEmail onPassEmail={passEmailData} />
            <LoginPassword onPassPassword={passPasswordData} />
            <Button type="submit" disabled={!formIsValid}>
              Login
            </Button>
            <Link to="/reset_request">Forgot Password?</Link>
          </form>
        </Card>
      )}
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && error && (
        <Modal
          onClick={modalClickHandler}
          title={"Error Message"}
          content={error}
        />
      )}
    </Fragment>
  );
};

export default Login;
