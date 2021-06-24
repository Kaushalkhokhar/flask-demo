import { Fragment, useEffect } from "react";
import UserList from "./UserList";
import useGetData from "../../hooks/use-getData";
import LoadingSpinner from "../../UI/LoadingSpinner";

const Users = () => {
  const {
    data: usersData,
    error,
    isLoading,
    isSuccess,
    fetchData: getUser,
  } = useGetData("/users");

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <Fragment>
      {isSuccess && usersData.payload.length === 0 && <p>No users are added</p>}
      {isSuccess && usersData.payload.length > 0 && <UserList users={usersData.payload} />}
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && error && <p>{error}</p>}
    </Fragment>
  );
};

export default Users;
