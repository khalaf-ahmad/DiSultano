import React from "react";
import { Form } from "react-bootstrap";

const FormControl = ({ control, changeHandler, name }) => {
  switch (control.elementType) {
    case "control":
      return (
        <Form.Group controlId={name}>
          <Form.Control
            {...control.elementConfig}
            value={control.value}
            onChange={changeHandler}
          />
        </Form.Group>
      );
    default:
      return null;
  }
};

export default FormControl;
