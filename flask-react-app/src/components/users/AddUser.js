import { useState, Fragment } from "react";
import LoadingSpinner from "../../UI/LoadingSpinner";
import UserForm from "./UserForm";

const AddUser = (props) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendUser = async (data, resetAll) => {
    setIsLoading(true);
    setError(false)
    try {
      const response = await fetch(
        // "https://react-http-9da4e-default-rtdb.firebaseio.com/add_user.jsons",
        "/add_user",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong.Please submit the form again.");
      }

      resetAll();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <Fragment>
      <UserForm onAddUser={sendUser} />
      {isLoading && !error && <LoadingSpinner />}
      {error && <p>{error}</p>}
    </Fragment>
  );
};

export default AddUser;
