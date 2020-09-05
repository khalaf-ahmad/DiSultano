import React, { Fragment } from "react";
import { Container, Row } from 'react-bootstrap';
import classes from "./Layout.module.css";
import Navigation from "../../components/Navigation/Navigation";

const layout = (props) => (
  <Fragment>
    <Navigation />
    <Container className={classes.Content} fluid="xs">
      <Row as="main" >
        {props.children}
      </Row>
    </Container>
  </Fragment>
);

export default layout;
