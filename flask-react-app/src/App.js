import { useState, useEffect } from "react";
import AddUser from "./components/users/AddUser";
import Users from "./components/users/Users";
import LoadingSpinner from "./UI/LoadingSpinner";

import './index.css';

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
  },[]);

  return (
    <div className={'row container'}>
      {!isLoading && !error && users.length === 0 && <p>No users are added</p>}
      {!isLoading && !error && users.length > 0 && <Users users={users} />}
      {isLoading && !error && <LoadingSpinner />}
      {!isLoading && error && <p>{error}</p>}
      <AddUser users={users} onGetUser={getUser}/>
    </div>
  );
}

export default App;
