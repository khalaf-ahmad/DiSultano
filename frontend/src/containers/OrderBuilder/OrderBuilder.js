import React, {useState, useCallback, useEffect} from 'react';
import { Col, Row } from 'react-bootstrap';
import Product from '../../components/ProductList/Product/Product';
import OrderFrom from './OrderForm/OrderForm';
import OrderDetailForm from './OrderDetailForm/OrderDetailForm';
import CategoryList from "./CategoryList/CategoryList";

const initial_category = { id: 0, name: "", products: [] };
const initial_product = { id: 0, name: "", price: 0, image: "" };

const iniial_order_detail = {
  detail_id: 0, detail_price: 0, description: "", quantity: 1,
  product: { ...initial_product }
};

const get_initial_detail = () => ({ ...iniial_order_detail });
const get_initial_category = () => ({ ...initial_category });

const OrderBuilder = () => {

  // Component State
  const [selected_category, setCategory] = useState(get_initial_category());
  const [show_detail_modal, set_detail_modal] = useState(false);
  const [order_detail, set_order_detail] = useState(get_initial_detail());
  const [products, set_products] = useState([]);

  // Open and Close Functions for Detail Form Modal
  const handleCloseDetailModal = useCallback(() => {
    set_detail_modal(false);
    set_order_detail(get_initial_detail());
  }, []);
  const handleShowDetailModal = useCallback(() => set_detail_modal(true), []);

  // Gettting Products from category when select category
  const on_select_category = useCallback(
    (category) => setCategory({ ...category }), []);

  const get_category_products = useCallback(() => {
    if (selected_category.id === 0) {
      set_products([]);
      return;
    }
    set_products([...selected_category.products]);
  }, [selected_category]);

// Getting detail from product when selecting product
  const get_detail_from_product = (product) => {
    const detail = get_initial_detail();
    detail.product = { ...product };
    detail.detail_price = detail.product.price;
    return detail;
  };
  const on_product_selected = (product_selected) => {
    set_order_detail(get_detail_from_product(product_selected));
    handleShowDetailModal();
  };

// update detail when change occurs
  const update_detail_info = (event) => {
    const property = event.target.name;
    let value = event.target.value;
    if (property === "quantity" || property === "detail_price") {
      value = +value;
    }
    const new_detail = { ...order_detail, [property]: value };
    set_order_detail(new_detail);
  };

// show detail form when select detail
  const on_detail_click = (detail) => {
    set_order_detail({ ...detail });
    handleShowDetailModal();
  };

  useEffect(() => {
    get_category_products();
  }, [get_category_products])


  const category_panel = (
    <CategoryList
      category_clicked={on_select_category}
      selected_category={selected_category} />
  );

  const product_panel = (
    products.map(product => (
      <Product
        product={product}
        on_double_click={() => on_product_selected(product)}
        key={product.id}
        size={{ xs: "6", sm: "4", md: "6", lg: "auto" }}/>
    ))
  );

  const order_detail_form = (
    <OrderDetailForm 
      order_detail={order_detail}
      show_detail_modal={show_detail_modal}
      handleCloseDetailModal={handleCloseDetailModal}
      update_detail_info={update_detail_info}/>
  );

  return (
    <React.Fragment>
      {show_detail_modal && order_detail_form}
      <Col xs="12" md="3">
        {category_panel}
      </Col>
      <Col xs="12" md="5">
        <Row>{product_panel}</Row>
      </Col>
      <Col className="border-left" xs="12" md="4">
        <OrderFrom on_detail_click={on_detail_click} />
      </Col>
    </React.Fragment>
  );
}


export default OrderBuilder;
