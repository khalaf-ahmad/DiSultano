import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Alert, Spinner } from "react-bootstrap";
import DetailBuilder from "./DetailBuilder/DetailBuilder";
import OrderInfo from "./OrderInfo/OrderInfo";
import CategoryList from "./CategoryList/CategoryList";
import Orders from "./Orders/Orders";
import classes from "./OrderBuilder.module.css";

const OrderBuilder = () => {
  // Component State
  const [products, set_products] = useState([]);

  // Getting State from redux store
  const loading = useSelector((state) => state.order_builder.loading);
  const error = useSelector((state) => state.order_builder.error);

  const handle_category_changed = useCallback(
    (category) => set_products(category.products),
    []
  );

  const alert = (
    <Alert className={classes.builderAlert} variant="danger">
      {error}
    </Alert>
  );

  const spinner = (
  <Spinner
    className={classes.builderSpinner}
    variant="info"
    animation="border"
    size="bg">
    <span className="sr-only">Loading...</span>
  </Spinner>
  );

  return (
    <React.Fragment>
      {error && alert}
      {loading && spinner}
      <Col xs="12" md="3" className={classes.BuildersRow}>
        <CategoryList category_changed={handle_category_changed} />
      </Col>
      <Col xs="12" md="5" className={classes.BuildersRow}>
        <Row>
          <DetailBuilder products={products} />
        </Row>
      </Col>
      <Col className="border-left" xs="12" md="4">
        <OrderInfo />
      </Col>
      <Orders />
    </React.Fragment>
  );
};

export default OrderBuilder;
