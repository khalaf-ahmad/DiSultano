import React from 'react';
import Button from 'react-bootstrap/Button';

function FormButtonsControls(props) {
  return (
    <>
      <Button variant="warning" onClick={props.handleShow}>
        Add Receivers
      </Button>
      <Button onClick={props.clear_clicked} type="reset" variant="outline-secondary">
        Clear
      </Button>
      {props.product.id > 0 && (
        <Button onClick={props.delete_product_clicked} type="button" variant="outline-danger">
          Delete
        </Button>
      )}
      <Button
        onClick={props.submit_clicked}
        type="submit"
        variant="outline-success"
        disabled={
          props.product.id ? props.disable_update : !props.product.name || !props.product.price
        }
      >
        {props.product.id ? 'Update' : 'Add'}
      </Button>
    </>
  );
}

export default FormButtonsControls;
