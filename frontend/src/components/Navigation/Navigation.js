import React, {useContext} from "react";
import { Navbar, Nav } from "react-bootstrap";
import classes from "./Navigation.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";
import AuthContext from '../../context/auth-context';
import { current_user } from '../../shared/utility';

const navigationLinks = [
  { name: "home", type: "link", path: "/" },
  { name: "inprogress", type: "link", path: "/inprogress" },
  { name: "store", type: "link", path: "/store" },
];

const optionsLinks = {
  name: "settings",
  type: "navdropdown",
  id: "options",
  dropdownitems: [
    { name: "profile", type: "navdropdownitem", path: "/profile" },
    { name: "users", type: "navdropdownitem", path: "/users" },
    { type: "navdropdowndivider" },
    { name: "logout", type: "navdropdownitem", path: "/logout" },
  ],
};

const Navigation = () => {
  const authContext = useContext(AuthContext);
  let links = [];
  if (authContext.isAuthenticated) {
    links = [...navigationLinks, optionsLinks];
  } else {
    links.push({ name: "login", type: "link", path: "/login" });
    links.push({
      name: "register",
      type: "link",
      path: "/register",
    });
  }

  let name = current_user.name ? "-" + current_user.name : "";
  name = name.length > 10 && window.innerWidth < 758 ?
    name.slice(0, 10) + "..." : name;
  return (
    <div>
      <Navbar collapseOnSelect expand="sm"
        className={classes.Navbar} fixed="top">
        <Navbar.Brand href="/" className={classes.Brand}>
          <h4> <span> Di</span> Soltano{name} </h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"
          className={classes.Toggler} />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavigationItems navLinks={links} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Navigation;
