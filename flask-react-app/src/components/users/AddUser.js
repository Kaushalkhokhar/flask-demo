import { useState, Fragment } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import UserForm from "./UserForm";

const AddUser = (props) => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendUser = async (data, resetAll) => {
    setIsLoading(true);
    setError(false);
    setIsSuccess(false)
    try {
      const response = await fetch("/add_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Header is necessary to fetch flask urls properly otherwise produce an error
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const json = await response.json();
        const error_response = await json.error;
        const split_index = error_response.indexOf(":") + 1;
        console.log(split_index);
        throw new Error(error_response.slice(split_index));
      }

      resetAll();
      setIsSuccess(true)
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <UserForm onAddUser={sendUser} error={error} />
      {isLoading && !error && <LoadingSpinner />}
      {error && <p>{error}</p>}
      {isSuccess && <p>Data Uploaded Successfully</p>}
    </Fragment>
  );
};

export default AddUser;
