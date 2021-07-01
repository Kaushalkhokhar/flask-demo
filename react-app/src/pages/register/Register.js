import { Fragment, useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import useSendData from "../../hooks/use-sendData";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";
import UserForm from "./UserForm";

const Register = (props) => {
  const history = useHistory();
  const {
    inputIsValid: success,
    errorResponse: error,
    isLoading,
    sendInput,
    resetState,
  } = useSendData();

  const addUser = useCallback(
    (newUser) => {
      sendInput("/api/register", "submit", newUser);
    },
    [sendInput]
  );

  useEffect(() => {
    if (!error && success) {
      history.push("/login");
    }
  }, [error, success, history]);

  const onClickHandler = () => {
    resetState();
  };

  return (
    <Fragment>
      {!isLoading && <UserForm onAddUser={addUser} />}
      {isLoading && !error && <LoadingSpinner />}
      {error && (
        <Modal
          onClick={onClickHandler}
          title={"Error Message"}
          content={error}
        />
      )}
    </Fragment>
  );
};

export default Register;
