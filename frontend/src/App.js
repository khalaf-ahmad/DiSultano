import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import { AuthContextProvider } from './context/auth-context';
import Logout from "./components/Logout/Logout";
import User from "./components/UserList/User/User";


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact render={() => <div>Home</div>} />
          </Switch>
          <User
            username="ahmad@khalaf"
            name="ahmad khalaf"
            role="2"
            activated={false}
          />
          <User
            username="ahmad@khalaf"
            name="ahmad khalaf"
            role="1"
            activated={true}
          />
        </Layout>
      </AuthContextProvider>
    </div>
  );
}

export default App;
