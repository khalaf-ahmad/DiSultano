import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import FromInputControl from '../../../UI/FromInputControl/FromInputControl';

const controls = [
  { name: 'quantity', label: 'Quantity', type: 'number' },
  { name: 'detail_price', label: 'Price', type: 'number' },
  { name: 'description', label: 'Description', type: 'text' },
];

function DetailForm(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.update_detail(props.order_detail);
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
        <Form onSubmit={handleSubmit}>
          <h5 className="text-success">{props.order_detail.product.name}</h5>
          {controls.map((control) => {
            return (
              <React.Fragment key={control.name}>
                <label>{control.label}</label>
                <FromInputControl
                  name={control.name}
                  id={`detail${control.name}Input`}
                  placeholder={control.label}
                  type={control.type}
                  value={props.order_detail[control.name]}
                  onChange={(event) => props.update_detail_info(event)}
                />
              </React.Fragment>
            );
          })}
          <Button type="submit" hidden />
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="outline-secondary" onClick={props.handleCloseDetailModal}>
          Close
        </Button>
        <Button variant="outline-success" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DetailForm;
