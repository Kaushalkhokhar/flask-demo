import { Fragment, useEffect } from "react";
import UserList from "./UserList";
import useGetData from "../../hooks/use-getData";
import LoadingSpinner from "../../UI/LoadingSpinner";

const Users = () => {
  const {
    data: users,
    error,
    isLoading,
    fetchData: getUser,
  } = useGetData("/get_users");

  useEffect(() => {
    getUser();
  }, [getUser]);

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
