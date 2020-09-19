import React, { Suspense } from 'react';
import { Route } from 'react-router-dom';

export const OrderWatcher = React.lazy(() =>
  import("./containers/OrderWatcher/OrderWatcher")
);

export const OrderBuilder = React.lazy(() =>
  import("./containers/OrderBuilder/OrderBuilder")
);

export const Store = React.lazy(() => import("./containers/Store/Store"));

export const Users = React.lazy(() => import("./containers/Users/Users"));

export default ({ Component, path, exact }) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => (
        <Suspense fallback={<div className="m-auto">loading...</div>}>
          <Component />
        </Suspense>
      )}
    />
  );
};