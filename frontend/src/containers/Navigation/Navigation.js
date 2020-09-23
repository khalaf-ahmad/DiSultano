import React, { useContext, useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import classes from "./Navigation.module.css";
import NavigationItems from "../../components/NavigationItems/NavigationItems";
import AuthContext from "../../context/auth-context";
import { UserLevel } from "../../shared/utility";
import { withRouter } from "react-router-dom";

const optionsLinks = {
  name: "settings",
  type: "navdropdown",
  id: "options",
  dropdownitems: [],
};

const home_link = { name: "home", type: "link", path: "/" };
const orders_watcher_link = {
  name: "Orders Watcher",
  type: "link",
  path: "/orders_watcher",
};
const store_link = { name: "store", type: "link", path: "/store" };
const profile_ink = {
  name: "profile",
  type: "navdropdownitem",
  path: "/profile",
};
const usesr_link = { name: "users", type: "navdropdownitem", path: "/users" };
const logout_link = {
  name: "logout",
  type: "navdropdownitem",
  path: "/logout",
};
const login_link = { name: "login", type: "link", path: "/login" };
const register_link = { name: "register", type: "link", path: "/register" };

const Navigation = (props) => {
  const authContext = useContext(AuthContext);
  const [nav_links, set_nav_links] = useState([]);

  useEffect(() => {
    let links = [];
    optionsLinks.dropdownitems = [];
    if (authContext.isAuthenticated) {
      optionsLinks.dropdownitems.push(profile_ink);
      links.push(home_link);
      links.push(orders_watcher_link);

      if (
        authContext.user.role === UserLevel.ADMIN ||
        authContext.user.role === UserLevel.SYS_ADMIN
      ) {
        links.push(store_link);
        optionsLinks.dropdownitems.push(usesr_link);
      }
      optionsLinks.dropdownitems.push({ type: "navdropdowndivider" });
      optionsLinks.dropdownitems.push(logout_link);
      links.push(optionsLinks);
    } else {
      links.push(login_link);
      links.push(register_link);
    }
    set_nav_links([...links]);
  }, [authContext.isAuthenticated, authContext.user.role]);

  let name = authContext.user.name ? "-" + authContext.user.name : "";
  name =
    name.length > 10 && window.innerWidth < 758 && window.innerWidth > 567
      ? name.slice(0, 10) + "..."
      : name;
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="sm"
        className={classes.Navbar}
        fixed="top"
        role="button"
      >
        <Navbar.Brand
          as="div"
          onClick={() => props.history.push("/")}
          className={classes.Brand}
        >
          <h4>
            {" "}
            <span> Di</span> Sultano{name}{" "}
          </h4>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className={classes.Toggler}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <NavigationItems navLinks={nav_links} />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(Navigation);
