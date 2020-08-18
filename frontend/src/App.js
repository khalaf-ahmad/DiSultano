import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import { AuthContextProvider } from './context/auth-context';
import Logout from "./components/Logout/Logout";
import Users from './containers/Users/Users';
import Profile from './containers/Profile/Profile';


function App(props) {
  return (
    <div className="App">
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route path="/profile" component={Profile} />
            <Route path="/users" component={Users} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact render={() => <div>Home</div>} />
          </Switch>
        </Layout>
      </AuthContextProvider>
    </div>
  );
}

export default App;
