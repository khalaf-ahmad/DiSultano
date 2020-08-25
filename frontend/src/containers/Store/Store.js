import React from 'react';
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import ProductList from '../../components/ProductList/ProductList';
import Categories from '../../components/Categories/Categories';

const Store = (props) => {
    
    const product_list = (
        <ProductList />
    );
    const categor_list = <Categories />;

    const width = window.innerWidth;
    let content = (
        <Col>
            <Tabs as={Col} defaultActiveKey="products" id="store-tab">
                <Tab  className="pt-2"  as={Col} eventKey="products" title="Products">
                    {product_list}
                </Tab>
                <Tab  className="pt-2"   as={Col} eventKey="categories" title="Categories">
                    {categor_list}
                </Tab>
            </Tabs>
        </Col>
    )
    if (width >= 758) {
        content = (
            <Col>
                <Row>
                    <Col md="8" >
                    {product_list}
                    </Col>
                    <Col md="4" className="d-flex flex-column border-left border-danger b-red " >
                    {categor_list}
                    </Col>
                </Row>
            </Col>  
        )
    }
    return content;
}

export default Store;
