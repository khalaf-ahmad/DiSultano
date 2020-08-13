import React, { Fragment } from "react";
import classes from "./Layout.module.css";
import Navigation from "../../components/Navigation/Navigation";

const layout = (props) => (
  <Fragment>
    <Navigation />
    <main className={classes.Content}>{props.children}</main>
  </Fragment>
);

export default layout;
