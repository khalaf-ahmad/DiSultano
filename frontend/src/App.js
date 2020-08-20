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
import Store from './containers/Store/Store';


const product = {
  name: "amirican",
  category: { name: "lebanese burger" },
  price: "120",
  receivers: [
    { name: "ahmad khalaf", id: 1 },
    { name: "yaser saleh", id: 2 },
    { name: "ali mohd", id: 3 },
    { name: "samer dedo", id: 4 },
  ],
  image: "../../../assets/images/th.jpeg",
};
const categories = [
  { name: "lebanese burger", id: 1 },
  { name: "chinese salad", id: 2 },
  { name: "egyptian fish", id: 3 },
  { name: "palestinian fool", id: 4 },
  { name: "lebanese burger", id: 11 },
  { name: "chinese salad", id: 22 },
  { name: "egyptian fish", id: 33 },
  { name: "palestinian fool", id: 44 },
  { name: "lebanese burger", id: 51 },
  { name: "chinese salad", id: 25 },
  { name: "egyptian fish", id: 335 },
  { name: "palestinian fool", id: 45 },
  { name: "lebanese burger", id: 15 },

];
function App(props) {
  return (
    <div className="App">
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route path="/store" render={() => <Store category_list={categories} products={[product, product, product]} />} />
            <Route path="/profile" component={Profile} />
            <Route path="/users" component={Users} />
            <Route path="/register" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact render={() => <div></div>} />
          </Switch>
        </Layout>
      </AuthContextProvider>
    </div>
  );
}

export default App;
