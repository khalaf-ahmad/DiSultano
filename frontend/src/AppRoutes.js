import React, { useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import Registration from './containers/Registration/Registration';
import Login from './containers/Login/Login';
import Logout from './components/Logout/Logout';
import Profile from './containers/Profile/Profile';
import LazyRoute, { OrderBuilder, OrderWatcher, Store, Users } from './lazy_routes';
import authContext from './context/auth-context';
import { UserLevel } from './shared/utility';

function AppRoutes() {
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

  let routes = (
    <Switch>
      <Route path="/register" component={Registration} />
      <Route path="/login" component={Login} />
    </Switch>
  );

  if (context.isAuthenticated) {
    routes = (
      <Switch>
        {store}
        {users}
        <LazyRoute path="/orders_watcher" Component={OrderWatcher} />
        <Route path="/profile" component={Profile} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />
        <LazyRoute path="/" Component={OrderBuilder} />
      </Switch>
    );
  }

  return <>{routes}</>;
}

export default AppRoutes;
