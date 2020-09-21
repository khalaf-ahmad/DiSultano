import React from "react";
import { Form } from "react-bootstrap";
const FromInputControl = (props) => {
  return (
    <div>
      <Form.Label htmlFor={props.id} srOnly>
        {props.label}
      </Form.Label>
      <Form.Control
        className="mb-2"
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        autoComplete="off"
      />
    </div>
  );
};

export default FromInputControl;
