import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../store/actions";
import ProductUI from "../../../components/Product/ProductUI/ProductUI";

const initial_product = { id: 0, name: "", price: 0, image: "" };

const iniial_order_detail = {
  detail_id: 0,
  detail_price: 0,
  description: "",
  quantity: 1,
  product: { ...initial_product },
};

const get_initial_detail = () => ({ ...iniial_order_detail });

const ProductList = ({ products }) => {
  const dispatch = useDispatch();
  // Mapping Store actions to functions

  const add_detail = useCallback(
    (detail) => dispatch(actions.add_detail(detail)),
    [dispatch]
  );

  // Getting detail from product when selecting product
  const get_detail_from_product = (product) => {
    const detail = get_initial_detail();
    detail.product = { name: product.name };
    detail.product_id = product.id;
    detail.detail_price = product.price;
    return detail;
  };

  const on_product_selected = (product_selected) => {
    const detail = get_detail_from_product(product_selected);
    add_detail({ ...detail, detail_id: Date.now() });
  };

  return products.map((product) => (
    <ProductUI
      product={product}
      card_clicked={() => on_product_selected(product)}
      key={product.id}
      size={{ xs: "6", sm: "4", md: "6", lg: "3" }}
    />
  ));
};

export default React.memo(ProductList);
