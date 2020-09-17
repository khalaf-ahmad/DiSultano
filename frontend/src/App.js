import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import { AuthContextProvider } from './context/auth-context';
import Logout from "./components/Logout/Logout";
import Profile from './containers/Profile/Profile';
import LazyRoute, {
  OrderBuilder,
  OrderWatcher,
  Store,
  Users,
} from "./lazy_routes";



function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Layout>
          <Switch>
            <LazyRoute path="/orders_watcher" Component={OrderWatcher} />
            <LazyRoute path="/store" Component={Store} />
            <LazyRoute path="/users" Component={Users} />
            <Route path="/profile" component={Profile} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <LazyRoute path="/" Component={OrderBuilder} />
          </Switch>
        </Layout>
      </AuthContextProvider>
    </div>
  );
}

export default App;
