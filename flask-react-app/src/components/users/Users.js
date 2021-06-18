import { Fragment } from "react";
import UserList from "./UserList";

const Users = (props) => {
  return (
    <Fragment>
      <UserList users={props.users} />
    </Fragment>
  );
};

export default Users;
