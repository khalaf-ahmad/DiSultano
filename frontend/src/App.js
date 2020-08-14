import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import Registration from "./containers/Registration/Registration";
function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/register" component={Registration} />
          <Route path="/" exact render={() => <div>Home</div>} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
