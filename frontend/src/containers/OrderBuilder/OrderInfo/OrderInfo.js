import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../store/actions";
import OrderForm from "../../../components/Order/OrderForm/OrderForm";
import QuestionModal from "../../../components/UI/QuestionModal/QuestionModal";
import OrderDetails from "../../../components/Order/OrderDetails/Details/Details";

const OrderInfo = (props) => {
  // Component State
  const [customer_name, set_customer_name] = useState("");
  const [description, set_description] = useState("");
  const [show_delete_modal, set_delete_modal] = useState(false);

  const dispatch = useDispatch();

  // Gettting order from redux store
  const order = useSelector((state) => state.order_builder.order);

  // Mapping Store Actions to component functions
  const delete_detail = useCallback(
    (index) => dispatch(actions.remove_detail(index)),
    [dispatch]
  );

  const set_order_info = useCallback(
    () => dispatch(actions.set_order_info(customer_name, description)),
    [dispatch, customer_name, description]
  );

  const reset_order = useCallback(() => dispatch(actions.reset_order()), [
    dispatch,
  ]);

  const add_order = useCallback(() => dispatch(actions.add_order()), [
    dispatch,
  ]);

  const update_order = useCallback(() => dispatch(actions.update_order()), [
    dispatch,
  ]);

  const delete_order = useCallback(
    () => dispatch(actions.delete_order(order.id)),
    [dispatch, order.id]
  );

  const on_order_submit = useCallback(
    (event) => {
      event.preventDefault();
      set_order_info();
      if (order.id === 0) add_order();
      else update_order();
    },
    [set_order_info, add_order, update_order, order.id]
  );

  const handle_delete_order = useCallback(() => {
    delete_order();
    set_delete_modal(false);
  }, [delete_order]);

  const handle_clear_order = useCallback(() => {
    reset_order();
    set_customer_name("");
    set_description("");
  }, [reset_order]);

  const delete_modal = (
    <QuestionModal
      show={show_delete_modal}
      submit_clicked={handle_delete_order}
      title={`Deleting ${customer_name} Order`}
      close_clicked={() => set_delete_modal(false)}
    />
  );

  const on_name_changed = useCallback(
    (event) => set_customer_name(event.target.value),
    []
  );

  const on_description_changed = useCallback(
    (event) => set_description(event.target.value),
    []
  );

  const on_delete_clicked = useCallback(() => set_delete_modal(true), []);

  // Setting component state to order info
  useEffect(() => {
    set_customer_name(order.customer_name);
    set_description(order.description);
  }, [order.customer_name, order.description]);

  return (
    <React.Fragment>
      {delete_modal}
      <OrderDetails
        details={order.details}
        delete_detail={delete_detail}
        on_detail_click={props.on_detail_click}
      />
      <div
        className={`d-flex justify-content-between 
        text-danger font-weight-bold mb-2`}
      >
        <span>TOTAL:</span>
        <span>{(+order.total_price.toFixed(3)).toLocaleString()}</span>
      </div>
      <OrderForm
        customer_name={customer_name}
        description={description}
        is_old_product={order.id > 0}
        has_details={order.details.length > 0}
        on_order_submit={on_order_submit}
        clear_clicked={handle_clear_order}
        delete_clicked={on_delete_clicked}
        name_changed={on_name_changed}
        description_changed={on_description_changed}
      />
    </React.Fragment>
  );
};

export default React.memo(OrderInfo);
