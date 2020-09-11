import React, {useEffect, useState} from 'react';
import { Form, ListGroup, Button } from 'react-bootstrap';
import { MdClear } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';
import FromInputControl
  from "../../../components/UI/FromInputControl/FromInputControl";
import QuestionModal from "../../../components/UI/QuestionModal/QuestionModal";

const OrderForm = (props) => {
// Component State
  const [customer_name, set_customer_name] = useState("");
  const [description, set_description] = useState("");
  const [show_delete_modal, set_delete_modal] = useState(false);

  const dispatch = useDispatch();

// Gettting order from redux store
  const order = useSelector(state => state.order_builder.order);

// Mapping Store Actions to component functions
  const delete_detail = (index) => dispatch(actions.remove_detail(index));

  const set_order_info = () =>
    dispatch(actions.set_order_info(customer_name, description));

  const reset_order = () => dispatch(actions.reset_order());

  const add_order = () => dispatch(actions.add_order());

  const update_order = () => dispatch(actions.update_order());

  const delete_order = () => dispatch(actions.delete_order(order.id));

  const on_order_submit = event => {
    event.preventDefault();
    set_order_info();
    if (order.id === 0)
      add_order();
    else
      update_order();
  }

  const handle_delete_submit = () => {
    delete_order();
    set_delete_modal(false);
  };

  const delete_modal = <QuestionModal
      show={show_delete_modal}
      submit_clicked={handle_delete_submit} 
      title={`Deleting ${customer_name} Order`}
      close_clicked={() => set_delete_modal(false)}
    />

// Setting component state to order info
  useEffect(() => {
    set_customer_name(order.customer_name);
    set_description(order.description);
  },[order.customer_name, order.description])

  return (
    <React.Fragment>
      {delete_modal}
      <ListGroup
        style={{ maxHeight: "250px", overflow: "auto" }}
        className="border-bottom mb-2"
        variant="flush"
      >
        {order.details.map((detail, idx) => {
          return (
            <ListGroup.Item
              onDoubleClick={() => props.on_detail_click(detail)}
              action
              key={idx}
              className="d-flex flex-wrap justify-content-between"
            >
              <span className="text-success">
                {detail.quantity +
                  "/ " +
                  (+detail.detail_price.toFixed(3)).toLocaleString()}
              </span>
              <span className="text-info lead">{detail.product.name}</span>
              {detail.description ? (
                <span className="text-muted font-italic">
                  {detail.description}
                </span>
              ) : (
                ""
              )}

              <MdClear color="red" onClick={() => delete_detail(idx)} />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Form className="b-1 text-large" onSubmit={on_order_submit}>
        <FromInputControl
          name="customer_name"
          id="orderCustomerInput"
          placeholder="Customer Name"
          type="text"
          value={customer_name}
          onChange={(event) => set_customer_name(event.target.value)}
        />
        <FromInputControl
          id="orderDescriptionInput"
          name="description"
          placeholder="Description"
          type="text"
          value={description}
          onChange={(event) => set_description(event.target.value)}
        />

        <Form.Label className="d-flex justify-content-between text-success font-weight-bold">
          <span>TOTAL:</span>
          <span>{(+order.total_price.toFixed(3)).toLocaleString()}</span>
        </Form.Label>
        <div className="d-flex justify-content-between">
          <Button
            type="reset"
            onClick={() => reset_order()}
            variant="outline-secondary"
          >
            Clear
          </Button>
          {order.id > 0 ? (
            <Button
              onClick={() => set_delete_modal(true)}
              variant="outline-danger"
            >
              Delete
            </Button>
          ) : null}
          <Button
            type="submit"
            disabled={order.details.length === 0}
            variant="outline-success"
          >
            Save
          </Button>
        </div>
      </Form>
    </React.Fragment>
  );
}

export default OrderForm;
