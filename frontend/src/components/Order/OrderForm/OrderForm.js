import React from "react";
import { Form, Button } from "react-bootstrap";
import FromInputControl from "../../UI/FromInputControl/FromInputControl";
import { FiPrinter } from "react-icons/fi";

const OrderForm = (props) => {
  return (
    <Form className="b-1 text-large" onSubmit={props.on_order_submit}>
      <FromInputControl
        name="customer_name"
        id="orderCustomerInput"
        placeholder="Customer Name"
        type="text"
        value={props.customer_name}
        onChange={props.name_changed}
      />
      <FromInputControl
        id="orderDescriptionInput"
        name="description"
        placeholder="Description"
        type="text"
        value={props.description}
        onChange={props.description_changed}
      />
      <div className="d-flex justify-content-between">
        <Button
          type="reset"
          onClick={props.clear_clicked}
          variant="outline-secondary"
        >
          Clear
        </Button>
        {props.is_old_product && (
          <Button onClick={props.delete_clicked} variant="outline-danger">
            Delete
          </Button>
        )}
        <Button
          type="submit"
          disabled={!props.has_details}
          variant="outline-success"
        >
          Save
        </Button>
        {props.is_old_product && (
          <Button onClick={props.print_order} variant="outline-secondary">
            <FiPrinter size="32" />
          </Button>
        )}
      </div>
    </Form>
  );
};

export default React.memo(OrderForm);
