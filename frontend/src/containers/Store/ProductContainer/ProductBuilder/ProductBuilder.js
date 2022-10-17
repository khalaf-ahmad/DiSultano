import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ProductForm from '../../../../components/Product/ProductForm/ProductForm';
import * as actionTypes from '../../../../store/actions/product';

const check_product_equality = (selected, initial) => {
  if (selected.image_form) return false;

  if (selected.name !== initial.name) return false;

  if (selected.price !== initial.price) return false;

  if (selected.category.id !== initial.category.id) return false;

  if (selected.receivers.length !== initial.receivers.length) return false;

  return initial.receivers.every(
    (user) => selected.receivers.findIndex((usr) => usr.id === user.id) >= 0,
  );
};

function ProductBuilder(props) {
  const [disable_update, set_disable_update] = useState(false);
  const { product, set_product, reset_product } = props;

  const dispatch = useDispatch();
  // Mapping redux actions to functions
  const add_product = useCallback(
    () => dispatch(actionTypes.add_product(props.product)),
    [dispatch, props.product],
  );

  const update_product = useCallback(() => {
    dispatch(actionTypes.update_product(props.product));
  }, [dispatch, props.product]);

  const delete_product = useCallback(
    () => dispatch(actionTypes.delete_product(props.product.id)),
    [dispatch, props.product.id],
  );

  const handle_add_receiver = useCallback(
    (user) => {
      const idx = product.receivers.findIndex((usr) => usr.id === user.id);
      if (idx >= 0) {
        return;
      }
      set_product((prev_state) => {
        return {
          ...prev_state,
          receivers: [{ ...user }, ...product.receivers],
        };
      });
    },
    [product, set_product],
  );

  const handle_delete_reciever = useCallback(
    (receiver_id) => {
      const updated_receivers = product.receivers.filter((reciever) => reciever.id !== receiver_id);
      set_product((prev_state) => {
        return {
          ...prev_state,
          receivers: updated_receivers,
        };
      });
    },
    [product, set_product],
  );

  const handle_input_change = useCallback(
    (event) => {
      let { value } = event.target;
      let property = event.target.name;
      if (property === 'category_id' || property === 'price') {
        value = +value;
      }
      if (property === 'category_id') {
        property = 'category';
        value = { id: value };
      }
      set_product((prev_state) => {
        return {
          ...prev_state,
          [property]: value,
        };
      });
    },
    [set_product],
  );

  const clear_form = useCallback(() => {
    reset_product();
    set_disable_update(false);
  }, [reset_product]);

  const detect_change_status = useCallback(() => {
    if (props.product.id === 0) return;
    const product = props.products.find((prd) => prd.id === props.product.id);

    if (!product) {
      clear_form();
      return;
    }
    const eq = check_product_equality(props.product, product);
    set_disable_update(eq);
  }, [props.product, props.products, clear_form]);

  useEffect(() => detect_change_status(), [props.product, detect_change_status]);

  useEffect(() => clear_form(), [clear_form, props.delete_product]);

  return (
    <ProductForm
      product={props.product}
      add_product={add_product}
      delete_product={delete_product}
      update_product={update_product}
      add_receiver={handle_add_receiver}
      delete_receiver={handle_delete_reciever}
      input_changed={handle_input_change}
      disable_update={disable_update}
      clear_form={clear_form}
      set_product={props.set_product}
    />
  );
}

export default ProductBuilder;
