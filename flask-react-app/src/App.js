import { useState, useEffect, Fragment } from "react";
import { Route } from "react-router-dom";
import MainHeader from "./components/layout/MainHeader";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import AddUser from "./pages/register/AddUser";
import Users from "./pages/register/Users";
import LoadingSpinner from "./UI/LoadingSpinner";

import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    const response = await fetch("/get_users");

    if (!response.ok) {
      throw new Error("Data has not fetched. Please refresh the page again");
    }

    const data = await response.json();
    setUsers(data.users);
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      getUser();
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const users_list = (
    <Fragment>
      {!isLoading && !error && users.length === 0 && <p>No users are added</p>}
      {!isLoading && !error && users.length > 0 && <Users users={users} />}
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && error && <p>{error}</p>}
    </Fragment>
  );

  return (
    <div>
      <MainHeader />
      {/* {users_list} */}
      <Route path="/login">
        <Login />
      </Route>
      <Route path='/about'>
        <About />
      </Route>
      <Route path="/add_user">
        <AddUser users={users} onGetUser={getUser} />
      </Route>
    </div>
  );
}

export default App;
