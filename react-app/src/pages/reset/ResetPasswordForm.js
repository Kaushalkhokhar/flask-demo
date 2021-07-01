import { useState, useCallback, Fragment } from "react";
import { useHistory, useParams } from "react-router";
import useSendData from "../../hooks/use-sendData";
import Password from "../../UI/Password";
import ConfPassword from "../../UI/ConfPassword";
import Card from "../../UI/Card";
import Button from "../../UI/Button";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";

import classes from "./Form.module.css";

const ResetPasswordForm = () => {
  const [passwordData, setPasswordData] = useState({});
  const [confPasswordData, setConfPasswordData] = useState({});
  const params = useParams();
  const history = useHistory();

  const url = "/api/reset_password";

  const {
    inputIsValid: success,
    errorResponse: error,
    isLoading,
    successResponse,
    sendInput,
    resetState,
  } = useSendData();

  const passPasswordData = useCallback((data) => {
    setPasswordData(data);
  }, []);

  const passConfPasswordData = useCallback((data) => {
    setConfPasswordData(data);
  }, []);

  let formIsValid = false;

  console.log(passwordData.passwordInputIsValid);
  console.log(confPasswordData.confPasswordInputIsValid);

  if (
    passwordData.passwordInputIsValid &&
    confPasswordData.confPasswordInputIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    const newData = {
      password: passwordData.passwordInputValue,
      token: params.token,
    };
    sendInput(url, "submit", newData);
  };

  const modalClickHandler = () => {
    resetState();
    if (success) {
      history.push("/login");
    }
  };

  return (
    <Fragment>
      <Card className={classes.form}>
        <form onSubmit={submitHandler}>
          <Password onPassPasswordData={passPasswordData} url={url} />
          <ConfPassword
            onPassConfPasswordData={passConfPasswordData}
            passwordInputValue={passwordData.passwordInputValue}
           />
          <Button disabled={!formIsValid} type="submit">
            Submit
          </Button>
        </form>
      </Card>
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && error && (
        <Modal
          onClick={modalClickHandler}
          title={"Error Message"}
          content={error}
        />
      )}
      {!isLoading && success && (
        <Modal
          onClick={modalClickHandler}
          title={"Success Message"}
          content={successResponse.message}
        />
      )}
    </Fragment>
  );
};

export default ResetPasswordForm;
