import React from 'react';
import Product from './Product/Product';
import ProductForm from "./ProductForm/ProductForm";
import { Row } from 'react-bootstrap';
const style = {
  height: "calc( 100vh - 210px)",
  overflow: "auto",
};
const ProductList = (props) => {
    return (
        <React.Fragment>
            <Row style={style} >
                {props.products.map((product, idx) => <Product key={idx} product={product} />)}
            </Row>
            <Row>
                <ProductForm
                    product={props.products[0]}
                    category_list={props.category_list}
                    price_changed={() => {}}
                    name_changed={() => { }} />
            </Row>
        </React.Fragment>
        )
}

export default ProductList;
