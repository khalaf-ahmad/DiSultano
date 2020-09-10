import React,{ useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions';
import { Modal, Button, Form } from 'react-bootstrap';
import FromInputControl
  from "../../../components/UI/FromInputControl/FromInputControl";

const OrderDetailForm = (props) => {
  const dispatch = useDispatch();

  const add_detail = useCallback(
    (detail) => dispatch(actions.add_detail(detail)),
    [dispatch]
  );

  const update_detail = useCallback(
    (detail) => dispatch(actions.update_detail(detail)),
    [dispatch]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (props.order_detail.detail_id === 0) {
      add_detail({ ...props.order_detail, detail_id: Date.now() });
    }
    else
      update_detail(props.order_detail);
    props.handleCloseDetailModal();
  };

  return (
    <Modal
      show={props.show_detail_modal}
      onHide={props.handleCloseDetailModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <h3>ORDER DETAILS</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} >
          <h5 className="text-success">{props.order_detail.product.name}</h5>
          <label>Quantity</label>
          <FromInputControl
            name="quantity"
            id="detailQuantityInput"
            placeholder="Quantity"
            type="number"
            value={props.order_detail.quantity}
            onChange={(event) => props.update_detail_info(event)}
          />
          <label>Price</label>
          <FromInputControl
            name="detail_price"
            id="detailPriceInput"
            placeholder="Price"
            type="number"
            value={props.order_detail.detail_price}
            onChange={(event) => props.update_detail_info(event)}
          />
          <label>Description</label>
          <FromInputControl
            name="description"
            id="detailDescriptionInput"
            placeholder="Description"
            type="text"
            value={props.order_detail.description}
            onChange={(event) => props.update_detail_info(event)}
          />
          <Button
            type='submit'
            hidden
          ></Button>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button
          variant="outline-secondary"
          onClick={props.handleCloseDetailModal}
        >
          Close
        </Button>
        <Button
          variant="outline-success"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default OrderDetailForm;
