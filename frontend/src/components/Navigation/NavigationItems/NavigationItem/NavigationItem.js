import React from "react";
import { NavDropdown, Nav } from "react-bootstrap";
import { NavLink as RRNavLink } from "react-router-dom";

const NavigationItem = ({ link }) => getNavItemByType(link);
const activeStyle = {
  color: "#cebd73",
  textDecoration: "underline",
};
const normalStyle = {
  color: "#FFF",
  fontSize: "18px",
  textTransform: "capitalize",
};
const getNavItemByType = (link, key=null) => {
  switch (link.type) {
    case "link":
      return (
        <Nav.Link
          as={RRNavLink}
          to={link.path}
          style={normalStyle}
          activeStyle={activeStyle}
          exact
          eventKey={link.path}
        >
          {link.name}
        </Nav.Link>
      );
    case "navdropdowndivider":
      return (
        <NavDropdown.Divider key={key} />
      );
    case "navdropdownitem":
      return (
        <NavDropdown.Item eventKey={link.path} key={key} as={RRNavLink} to={link.path} exact>
          {link.name}
        </NavDropdown.Item>
      );
    case "navdropdown":
      return (
        <NavDropdown
          style={{ ...normalStyle, marginRight: "56px" }}
          title={link.name}
          id={`nav-dropdown-${link.id}`}
        >
          {link.dropdownitems.map((item, idx) => getNavItemByType(item, idx))}
        </NavDropdown>
      );
    default:
      return null;
  }
};

export default NavigationItem;
