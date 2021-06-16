import { useEffect, useState } from "react";
import UserList from "./UserList";
import LoadingSpinner from "../../UI/LoadingSpinner";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getUser = async () => {
      const response = await fetch("http://127.0.0.1:5000/get_users");

      if (!response.ok) {
        throw new Error("Data has not fetched. Please refresh the page again");
      }

      const data = await response.json();
      setUsers(data.users);
    };
    try {
      getUser();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return (
    <Fragment>
      {!isLoading && !error && users.length === 0 && <p>No users are added</p>}
      {!isLoading && !error && users.length > 0 && <UserList users={users} />}
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && error && <p>{error}</p>}
    </Fragment>
  );
};

export default Users;
