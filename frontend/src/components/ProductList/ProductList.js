import React from 'react';
import Product from './Product/Product';

const ProductList = (props) => {
    return (props.products.map((product, idx) => <Product key={idx} product={product} />))
}

export default ProductList;
