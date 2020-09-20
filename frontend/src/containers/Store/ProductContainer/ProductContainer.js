import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../../../components/Product/ProductList/ProductList";
import { Spinner, Alert, Row } from "react-bootstrap";
import ProductBuilder from "./ProductBuilder/ProductBuilder";
import * as actionTypes from "../../../store/actions/product";

const initial_product = {
  id: 0,
  name: "",
  category: { id: 0, name: "" },
  price: 0,
  receivers: [],
  image: "",
  image_form: "",
};

const get_initial_product = () => {
  return {
    ...initial_product,
    receivers: [...initial_product.receivers],
  };
};

const row_height_style = {
  maxHeight: "calc( 100vh - 395px)",
  overflow: "auto",
};

const status_position_style = {
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: "3031",
};

const ProductContainer = (props) => {
  const [product, set_product] = useState(get_initial_product());

  const dispatch = useDispatch();

  // Getting state from redux store
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);
  const products = useSelector((state) => state.product.products);

  // Map redux actions to function
  const fetch_products = useCallback(
    () => dispatch(actionTypes.fetch_products()),
    [dispatch]
  );

  const handle_product_selected = useCallback(
    (product) => set_product({ ...product }),
    []
  );

  const reset_product = useCallback(
    () => set_product(get_initial_product()),
    []
  );

  useEffect(() => {
    fetch_products();
  }, [fetch_products]);

  const spinner = (
    <Spinner
      variant="danger"
      animation="grow"
      style={status_position_style}
      size="sm"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  const alert = (
    <Alert style={status_position_style} variant="danger">
      {error}
    </Alert>
  );

  return (
    <React.Fragment>
      {error && alert}
      {loading && spinner}
      <Row style={row_height_style}>
        <ProductList
          products={products}
          on_product_selected={handle_product_selected}
        />
      </Row>
      <Row>
        <ProductBuilder
          product={product}
          reset_product={reset_product}
          set_product={set_product}
          products={products}
        />
      </Row>
    </React.Fragment>
  );
};

export default ProductContainer;
