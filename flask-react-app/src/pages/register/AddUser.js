import { Fragment, useCallback } from "react";
import useSendInput from "../../hooks/use-sendInput";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";
import UserForm from "./UserForm";

const AddUser = (props) => {
  const {
    inputIsValid: isSuccess,
    errorResponse: error,
    isLoading,
    successResponse,
    sendInput,
    resetState,
  } = useSendInput("/add_user", "submit");

  const sendUser = useCallback(
    (resetAll) => {
      sendInput();
      if (!error) {
        resetAll();
      }
    },
    [sendInput, error]
  );

  const onClickHandler = () => {
    resetState();
  };

  return (
    <Fragment>
      <UserForm onAddUser={sendUser} error={error} users={props.users} />
      {isLoading && !error && <LoadingSpinner />}
      {error && (
        <Modal
          onClick={onClickHandler}
          title={"Invalid Input"}
          content={error}
        />
      )}
      {error && <p>{error}</p>}
      {isSuccess && (
        <Modal
          onClick={onClickHandler}
          title={"Success Message"}
          content={successResponse}
        />
      )}
    </Fragment>
  );
};

export default AddUser;
