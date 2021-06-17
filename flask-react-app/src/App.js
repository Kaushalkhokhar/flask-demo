import { Fragment } from "react";
import AddUser from "./components/users/AddUser";
import Users from "./components/users/Users";

function App() {
  

  return (
    <Fragment>
      <Users />
      <AddUser />
    </Fragment>
  );
}

export default App;
