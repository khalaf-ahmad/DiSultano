import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation/Navigation";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/store" render={() => <div>Store</div>} />
          <Route path="/" exact render={() => <div>Home</div>} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
