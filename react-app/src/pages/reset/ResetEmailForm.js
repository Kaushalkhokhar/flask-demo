import { useState, Fragment, useCallback } from "react";
import { useHistory } from "react-router";
import useSendData from "../../hooks/use-sendData";
import Email from "../../UI/Email";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";

import classes from "./Form.module.css";

const ResetEmailForm = () => {
  const [emailData, setEmailData] = useState({});
  const history = useHistory();

  const url = "/api/reset_request"

  const {
    inputIsValid: success,
    errorResponse: error,
    isLoading,
    successResponse,
    sendInput,
    resetState,
  } = useSendData();

  let formIsValid = false;

  if (emailData.emailInputIsValid) {
    formIsValid = true;
  }

  const passEmailData = useCallback((data) => {
    setEmailData(data);
  }, []);

  const submitHandler = (event) => {
    event.preventDefault();

    const newData = {
      email: emailData.emailInputValue,
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
          <Email onPassEmailData={passEmailData} url={url}/>
          <Button type="submit" disabled={!formIsValid}>
            Send Request
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

export default ResetEmailForm;
