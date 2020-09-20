import React from "react";
import Product from "../ProductUI/ProductUI";

const ProductList = (props) => {
  return props.products.map((product) => (
    <Product
      card_clicked={() => props.on_product_selected(product)}
      category={product.category}
      key={product.id}
      size={{
        xs: "6",
        sm: "4",
        lg: "3",
      }}
      product={product}
    />
  ));
};

export default React.memo(ProductList);
