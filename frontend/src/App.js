import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navigation from "./components/Navigation/Navigation";
import { Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navigation />
      <div style={{ marginTop: "72px" }}>
        <Switch>
          <Route path="/store" render={() => <div>Store</div>} />
          <Route path="/" render={() => <div>Home</div>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
