import React, {useCallback} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import Order from '../../../components/Order/Order';
import Col from 'react-bootstrap/Col';
import * as actions from "../../../store/actions";


const OrderList = () => {
  const dispatch = useDispatch();

// Fetch order list from react redux state
  const order_list = useSelector(state => state.order_builder.order_list);

// Getting Redux actions
  const set_order = useCallback((order) => dispatch(actions.set_order(order)),
    [dispatch]);

  const order_clicked = (order) => {
    set_order(order);
  }
  return order_list.map((order) => (
    <Col key={order.id} className="mb-2" xs="6" sm="4" md="3" lg="2">
      <Order order={order} card_clicked={() => order_clicked(order)} />
    </Col>
  ));
}

export default OrderList;
