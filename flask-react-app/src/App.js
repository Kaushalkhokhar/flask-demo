import { Route, Switch, Redirect } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import About from "./pages/about/About";
import Register from "./pages/register/Register";
import Users from "./pages/users/Users";
import Logout from "./pages/logout/Logout";
import NotFound from "./pages/NotFound";

import "./index.css";

function App() {

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/home" />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path="/users">
          <Users/>
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
