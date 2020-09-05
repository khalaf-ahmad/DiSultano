import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Product from "./Product/Product";
import ProductForm from "./ProductForm/ProductForm";
import { Row, Spinner, Alert } from "react-bootstrap";
import * as actionTypes from "../../store/actions/product";
import { fetch_users_initiate } from "../../store/actions/users";

const style = {
  maxHeight: "calc( 100vh - 395px)",
  overflow: "auto",
};

const initial_product = {
  id: 0,
  name: "",
  category_id: 0,
  price: 0,
  receivers: [],
  image: "",
  image_form: "",
};

const get_initial_product = () => {
  return {
    ...initial_product,
    receivers: [...initial_product.receivers],
  };
};

const check_product_equality = (selected, initial) => {

  if (selected.image_form)
    return false;

  if (selected.name !== initial.name)
    return false;

  if (selected.price !== initial.price)
    return false;

  if (selected.category_id !== initial.category_id)
    return false;

  if (selected.receivers.length !== initial.receivers.length)
    return false;

  return initial.receivers.every(user =>
    selected.receivers.findIndex(usr => usr.id === user.id) >= 0);
}

const ProductList = (props) => {
  const [selected_product, set_selected_product] = useState(
    get_initial_product()
  );

  const [disable_update, set_disable_update] = useState(false);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const categories = useSelector((state) => state.category.categories);
  const users = useSelector((state) => state.users.users);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const fetch_products = useCallback(
    () => dispatch(actionTypes.fetch_products(false)),
    [dispatch]
  );

  const fetch_users = useCallback(() => dispatch(fetch_users_initiate()),
    [dispatch]
  );

  const add_product = useCallback(
    () => dispatch(actionTypes.add_product(selected_product)),
    [dispatch, selected_product]
  );

  const update_product = useCallback(() => {
    dispatch(actionTypes.update_product(selected_product));
  }, [dispatch, selected_product]);

  const delete_product = useCallback(
    () => dispatch(actionTypes.delete_product(selected_product.id)),
    [dispatch, selected_product.id]
  );

  const clear_form = useCallback(
    () => {
      set_selected_product(get_initial_product());
      set_disable_update(false)
    },
    [set_selected_product]
  );
  const detect_change_status = useCallback(() => {
    if (selected_product.id === 0)
      return;
    const product = products.find(prd => prd.id === selected_product.id);

    if (!product) {
      clear_form();
      return;
    }
    const eq = check_product_equality(selected_product, product);
    set_disable_update(eq);
  }, [selected_product, products, clear_form]);

  useEffect(() => detect_change_status(),
    [selected_product, detect_change_status]
  );

  useEffect(() => {
    fetch_products();
    fetch_users();
  }, [fetch_products, fetch_users]);

  useEffect(() => clear_form(), [clear_form, products]);

  const handle_change = (event) => {
    let value = event.target.value;
    const property = event.target.name;
    if (property === "category_id" || property === "price") value = +value;
    set_selected_product((prevState) => {
      return {
        ...prevState,
        [property]: value,
      };
    });
  };

  const handle_image_changed = (event) => {
    const new_image = event.target.files[0];
    set_selected_product((prevState) => {
      return {
        ...prevState,
        image_form: new_image,
      };
    });
  };

  const handle_add_receiver = (user) => {
    const idx = selected_product.receivers.findIndex(
      (usr) => usr.id === user.id
    );
    if (idx >= 0) {
      return;
    }
    set_selected_product((prevState) => {
      return {
        ...prevState,
        receivers: [{ ...user }, ...prevState.receivers],
      };
    });
  };

  const handle_delete_user = (receiver_id) => {
    const updated_receivers = selected_product.receivers.filter(
      (reciever) => reciever.id !== receiver_id
    );
    set_selected_product((prevState) => {
      return {
        ...prevState,
        receivers: updated_receivers,
      };
    });
  };

  const handle_submit = (event) => {
    event.preventDefault();
    if (selected_product.id === 0) {
      add_product();
    } else {
      update_product();
    }
    clear_form();
  };

  const on_product_selected = (product_selected) => {
    set_selected_product({ ...product_selected });
  };

  const get_category_by_id = (category_id) => {
    const category = categories.find((ctr) => ctr.id === category_id);
    return category;
  };

  return (
    <React.Fragment>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row style={style}>
        {products.map((product, idx) => (
          <Product
            card_clicked={() => on_product_selected(product)}
            category={get_category_by_id(product.category_id)}
            key={idx}
            product={product}
          />
        ))}
      </Row>
      <Row>
        <ProductForm
          product={selected_product}
          category_list={categories}
          input_changed={(event) => handle_change(event)}
          users={users}
          delete_user_clicked={handle_delete_user}
          add_user_clicked={handle_add_receiver}
          image_changed={(event) => handle_image_changed(event)}
          clear_clicked={clear_form}
          submit_clicked={handle_submit}
          delete_product_clicked={delete_product}
          disable_update={disable_update}
        />
      </Row>
      {loading && (
        <Spinner
          variant="danger"
          animation="grow"
          style={{ position: "absolute", right: "50%", top: "50%" }}
          size="sm"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </React.Fragment>
  );
};

export default ProductList;
