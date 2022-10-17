import React from 'react';
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import ProductContainer from './ProductContainer/ProductContainer';
import CategoryContainer from './CategoryContainer/CategoryContainer';
import classes from './Store.module.css';

const Store = () => {
  const product_container = <ProductContainer />;
  const categor_container = <CategoryContainer />;
  const content =
    window.innerWidth < 758 ? (
      <Col>
        <Tabs as={Col} defaultActiveKey="products" id="store-tab">
          <Tab className="pt-2" as={Col} eventKey="products" title="Products">
            {product_container}
          </Tab>
          <Tab className="pt-2" as={Col} eventKey="categories" title="Categories">
            {categor_container}
          </Tab>
        </Tabs>
      </Col>
    ) : (
      <Col>
        <Row style={{ height: '100%' }}>
          <Col md="8" className={classes.ProductList}>
            {product_container}
          </Col>
          <Col md="4" className={classes.CategoryList}>
            {categor_container}
          </Col>
        </Row>
      </Col>
    );
  return content;
};

export default Store;
