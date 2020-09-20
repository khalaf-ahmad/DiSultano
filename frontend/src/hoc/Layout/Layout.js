import React, { Fragment } from "react";
import { Container, Row } from "react-bootstrap";
import classes from "./Layout.module.css";
import Navigation from "../../containers/Navigation/Navigation";

const layout = (props) => (
  <Fragment>
    <Navigation />
    <Container
      className={classes.Content}
      fluid="xs"
      style={{ height: "calc(100vh - 63px)" }}
    >
      <Row as="main" style={{ height: "100%" }}>
        {props.children}
      </Row>
    </Container>
  </Fragment>
);

export default layout;
