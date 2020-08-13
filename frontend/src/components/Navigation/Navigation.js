import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import classes from "./Navigation.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";

const navigationLinks = [
  { name: "home", type: "link", path: "/" },
  { name: "orders", type: "link", path: "/orders" },
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
    { name: "register", type: "navdropdownitem", path: "/register" },
  ],
};
const Navigation = () => {

  const links = [...navigationLinks];
  const options = { ...optionsLinks }
  options["dropdownitems"] = [
    ...optionsLinks.dropdownitems,
    { name: "login", type: "navdropdownitem", path: "/login" },
  ];
  links.push(options);

  return (
    <div>
      <Navbar collapseOnSelect expand="sm" className={classes.Navbar} fixed="top">
        <Navbar.Brand href="/" className={classes.Brand}>
          <h4> <span> Di</span> Soltano </h4>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" className={classes.Toggler}/>
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
