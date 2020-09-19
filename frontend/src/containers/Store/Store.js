import React from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import ProductList from "../../components/ProductList/ProductList";
import Categories from "../../components/Categories/Categories";
import classes from "./Store.module.css";

const Store = () => {
  const product_list = <ProductList />;
  const categor_list = <Categories />;
  const content = window.innerWidth < 758 ? (
    <Col>
      <Tabs as={Col} defaultActiveKey="products" id="store-tab">
        <Tab className="pt-2" as={Col} eventKey="products" title="Products">
          {product_list}
        </Tab>
        <Tab className="pt-2" as={Col} eventKey="categories" title="Categories">
          {categor_list}
        </Tab>
      </Tabs>
    </Col>
  ) : (
    <Col>
      <Row style={{ height: "100%" }}>
        <Col md="8" className={classes.ProductList}>
          {product_list}
        </Col>
        <Col md="4" className={classes.CategoryList}>
          {categor_list}
        </Col>
      </Row>
    </Col>
    );
  return content;
};

export default Store;
