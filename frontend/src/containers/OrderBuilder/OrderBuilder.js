import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Alert, Spinner } from 'react-bootstrap';
import Product from '../../components/ProductList/Product/Product';
import OrderFrom from './OrderForm/OrderForm';
import OrderDetailForm from './OrderDetailForm/OrderDetailForm';
import CategoryList from "./CategoryList/CategoryList";
import OrderList from './OrderList/OrderList';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import * as actions from "../../store/actions";
import classes from './OrderBuilder.module.css';

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

  // Getting State from redux store
  const loading = useSelector(state => state.order_builder.loading);
  const error = useSelector(state => state.order_builder.error);
  const has_next = useSelector(state => state.order_builder.has_next);
  const has_prev = useSelector((state) => state.order_builder.has_prev);
  const page = useSelector(state => state.order_builder.page);
  const pages = useSelector(state => state.order_builder.pages);

  const dispatch = useDispatch();
  // Mapping Store actions to functions
  const fetch_orders = useCallback(() => dispatch(actions.fetch_orders()),
    [dispatch]);

  const increment_page = useCallback(() => dispatch(actions.increment_page()),
    [dispatch]);
  const decrement_page = useCallback(() => dispatch(actions.decrement_page()),
    [dispatch])


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
    detail.product = { name: product.name };
    detail.product_id = product.id;
    detail.detail_price = product.price;
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


  useEffect(() => {
    fetch_orders();
  }, [fetch_orders, page]);

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
      {error && (
        <Alert
          style={{
            position: "fixed",
            top: "72px",
            zIndex: "1340",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          variant="danger"
        >
          {error}
        </Alert>
      )}
      {show_detail_modal && order_detail_form}
      <Col xs="12" md="3">
        {category_panel}
      </Col>
      <Col
        xs="12"
        md="5"
        style={{
          maxHeight: "450px",
          overflow: "auto",
        }}
      >
        <Row>{product_panel}</Row>
      </Col>
      <Col className="border-left" xs="12" md="4">
        <OrderFrom on_detail_click={on_detail_click} />
      </Col>
      {pages > 0 ? (
        <Col className={classes.ordersWrapper}>
          <Row
            style={{
              maxHeight: "350px",
              overflow: "auto",
            }}
            className={["border m-2 p-2", classes.flexItem].join(" ")}
          >
            <OrderList />
          </Row>
          <div
            className={[
              "d-flex justify-content-between",
              classes.flexItem,
            ].join(" ")}
          >
            <MdNavigateBefore
              role="button"
              aria-disabled="true"
              color={has_prev ? "red" : "#e5e5e5"}
              size="40px"
              onClick={() => has_prev && decrement_page()}
            />
            <span className="p-2 text-success">{page + " / " + pages}</span>
            <MdNavigateNext
              role="button"
              color={has_next ? "red" : "#e5e5e5"}
              size="40px"
              onClick={() => has_next && increment_page()}
            />
          </div>
        </Col>
      ) : null}
      {loading && (
        <Spinner
          style={{
            position: "fixed",
            right: "50%",
            top: "63px",
            zIndex: "1031",
          }}
          variant="info"
          animation="border"
          size="bg"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </React.Fragment>
  );
}


export default OrderBuilder;
