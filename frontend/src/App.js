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


const products = [
  {
    name: "amirican",
    category: { name: "lebanese burger", id: 1 },
    price: "120",
    receivers: [
      { name: "ahmad khalaf", id: 1 },
      { name: "yaser saleh", id: 2 },
      { name: "ali mohd", id: 3 },
      { name: "samer dedo", id: 4 },
    ],
    // image: "/home/ahmad/Desktop/DiSoltano/frontend/src/assets/images/th.jpeg",
    image: "",
  },
  {
    name: "Disoltano",
    category: { name: "egyptian burger", id:2 },
    price: "70",
    receivers: [
      { name: "ahmad khalaf", id: 1 },
      { name: "yaser saleh", id: 2 },
    ],
    // image: "/home/ahmad/Desktop/DiSoltano/frontend/src/assets/images/th.jpeg",
    image: "",
  },
  {
    name: "saudio",
    category: { name: "lebanese burger", id: 4 },
    price: "23",
    receivers: [
      { name: "ahmad khalaf", id: 1 },
      { name: "ali mohd", id: 3 },
      { name: "samer dedo", id: 4 },
    ],
    // image: "/home/ahmad/Desktop/DiSoltano/frontend/src/assets/images/th.jpeg",
    image: "",
  },
  {
    name: "botato",
    category: { name: "lebanese burger", id: 3 },
    price: "230",
    receivers: [

      { name: "samer dedo", id: 4 },
    ],
    // image: "/home/ahmad/Desktop/DiSoltano/frontend/src/assets/images/th.jpeg",
    image: "",
  },
  {
    name: "canda",
    category: { name: "lebanese burger", id: 5 },
    price: "54",
    receivers: [
      { name: "ahmad khalaf", id: 1 },
      { name: "yaser saleh", id: 2 },
      { name: "ali mohd", id: 3 },
      { name: "samer dedo", id: 4 },
    ],
    // image: "/home/ahmad/Desktop/DiSoltano/frontend/src/assets/images/th.jpeg",
    image: "",
  },
];
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
  // { name: "chinese salad", id: 25 },
  // { name: "egyptian fish", id: 335 },
  // { name: "palestinian fool", id: 45 },
  // { name: "chinese salad", id: 223 },
  // { name: "egyptian fish", id: 332 },
  // { name: "palestinian fool", id: 244 },
  // { name: "lebanese burger", id: 251 },
  // { name: "chinese salad", id: 245 },
  // { name: "egyptian fish", id: 3335 },
  // { name: "palestinian fool", id: 453 },
];
const users = [
  { name: "Ahmad khalaf", id: 1 },
  { name: "Ibrahim Mousa", id: 2 },
  { name: "Aysar hajaj", id: 3 },
  { name: "Samer salim", id: 4 },
  { name: "Khalid dahwish", id: 11 },
  { name: "Ali mohd", id: 22 },
  { name: "Essa Rahel", id: 33 },

];
function App(props) {
  return (
    <div className="App">
      <AuthContextProvider>
        <Layout>
          <Switch>
            <Route
              path="/store"
              render={() => (
                <Store
                  category_list={categories}
                  users={users}
                  products={[
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                    ...products,
                  ]}
                />
              )}
            />
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
