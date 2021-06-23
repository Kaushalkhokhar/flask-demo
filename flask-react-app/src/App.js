import { Route } from "react-router-dom";
import MainHeader from "./components/layout/MainHeader";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import AddUser from "./pages/register/AddUser";
import Users from "./pages/users/Users";

import "./index.css";

function App() {

  return (
    <div>
      <MainHeader />
      <Route path="/login">
        <Login />
      </Route>
      <Route path='/about'>
        <About />
      </Route>
      <Route path="/add_user">
        <AddUser />
      </Route>
      <Route path="/get_users">
        <Users/>
      </Route>
    </div>
  );
}

export default App;
