import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderUI from "../../../components/Order/OrderUI/OrderUI";
import * as actions from "../../../store/actions";
import { Col, Row } from "react-bootstrap";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const Orders = () => {
  const dispatch = useDispatch();

  // Fetch order list from react redux state
  const order_list = useSelector((state) => state.order_builder.order_list);
  const has_next = useSelector((state) => state.order_builder.has_next);
  const has_prev = useSelector((state) => state.order_builder.has_prev);
  const page = useSelector((state) => state.order_builder.page);
  const pages = useSelector((state) => state.order_builder.pages);

  // Getting Redux actions
  const set_order = useCallback((order) => dispatch(actions.set_order(order)), [
    dispatch,
  ]);

  const fetch_orders = useCallback(() => dispatch(actions.fetch_orders()), [
    dispatch,
  ]);

  const increment_page = useCallback(() => dispatch(actions.increment_page()), [
    dispatch,
  ]);
  const decrement_page = useCallback(() => dispatch(actions.decrement_page()), [
    dispatch,
  ]);

  const order_clicked = (order) => {
    set_order(order);
  };

  useEffect(() => {
    fetch_orders();
  }, [fetch_orders, page]);

  return pages > 0 ? (
    <Col
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-end",
      }}
    >
      <Row
        style={{
          maxHeight: "350px",
          overflow: "auto",
          flexBasis: "100%",
        }}
        className="border m-2 p-2"
      >
        {order_list.map((order) => (
          <Col key={order.id} className="mb-2" sm="6" md="4" lg="2">
            <OrderUI order={order} card_clicked={() => order_clicked(order)} />
          </Col>
        ))}
      </Row>
      <div
        className="d-flex justify-content-between"
        style={{ flexBasis: "100%" }}
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
  ) : null;
};

export default React.memo(Orders);
