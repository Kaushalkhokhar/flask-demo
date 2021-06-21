import { useState, Fragment, useCallback } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Modal from "../../UI/Modal";
import UserForm from "./UserForm";

const AddUser = (props) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { onGetUser } = props;

  const sendUser = useCallback(
    async (data, resetAll) => {
      setIsLoading(true);
      setError(false);
      setIsSuccess(false);
      try {
        const response = await fetch("/add_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Header is necessary to fetch flask urls properly otherwise produce an error
          body: JSON.stringify(data),
        });

        // console.log(response);
        if (!response.ok) {
          const json = await response.json();
          const error_response = await json.error;
          const split_index = error_response.indexOf(":") + 1;
          throw new Error(error_response.slice(split_index));
        }

        if (resetAll) {
          resetAll();
        }
        onGetUser();
        setIsSuccess(true);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    [onGetUser]
  );

  const onClickHandler = () => {
    setIsSuccess(false);
    setError(false);
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
          content={"Data uploaded successfully"}
        />
      )}
    </Fragment>
  );
};

export default AddUser;
