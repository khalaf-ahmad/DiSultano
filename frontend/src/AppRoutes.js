import React, { useContext } from 'react';
import { Route, Switch } from "react-router-dom";
import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import Logout from "./components/Logout/Logout";
import Profile from "./containers/Profile/Profile";
import LazyRoute, {
  OrderBuilder,
  OrderWatcher,
  Store,
  Users,
} from "./lazy_routes";
import authContext from "./context/auth-context";
import { UserLevel } from './shared/utility';



const AppRoutes = () => {
  const context = useContext(authContext);

  const user_level = context.user.role;

  const store =
    user_level === UserLevel.ADMIN || user_level === UserLevel.SYS_ADMIN ? (
      <LazyRoute path="/store" Component={Store} />
    ) : null;

  const users =
    user_level === UserLevel.ADMIN || user_level === UserLevel.SYS_ADMIN ? (
      <LazyRoute path="/users" Component={Users} />
    ) : null;
  
  return (
    <React.Fragment>
      <Switch>
        <LazyRoute path="/orders_watcher" Component={OrderWatcher} />
        {store}
        {users}
        <Route path="/profile" component={Profile} />
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <LazyRoute path="/" Component={OrderBuilder} />
      </Switch>
    </React.Fragment>
  );
}

export default AppRoutes;
