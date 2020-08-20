import React from 'react';
import { Col, Row, Tabs, Tab } from 'react-bootstrap';
import ProductList from '../../components/ProductList/ProductList';
import Categories from '../../components/Categories/Categories';
import classes from './Store.module.css';

const style = {
    maxHeight: "calc( 100vh - 95px)",
    overflow:"auto",
};
const Store = (props) => {
    const handle_delete_category = (category_id) => {

    };
    
    const handle_update_category = (category) => {
        
    };

    const handle_add_category = (category_name) => {

    };
    
    const product_list = (
        <Row>
            <ProductList products={props.products} />
        </Row>
    );
    const categor_list = <Categories
        delete_clicked={handle_delete_category}
        category_list={props.category_list} />;
    return (
    <React.Fragment>
        <Col className={classes.ShowOnMobile}>
            <Tabs as={Col} defaultActiveKey="products" id="uncontrolled-tab-example">
                <Tab style={style}  xs="12" as={Col} eventKey="products" title="Products">
                    {product_list}
                </Tab>
                <Tab style={style} className="p-0"  xs="12" as={Col} eventKey="categories" title="Categories">
                    {categor_list}
                </Tab>
            </Tabs>
        </Col>
        <Col className={classes.ShowOnDesktop}>
            <Row>
                <Col style={style} xs="8" >
                {product_list}
                </Col>
                <Col xs="4" style={style} className="p-0">
                {categor_list}
                </Col>
            </Row>
        </Col>
    </React.Fragment>
    );
}

export default Store;
