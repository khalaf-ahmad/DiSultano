import React from 'react';
import { Col, Form } from 'react-bootstrap';
const ProductFormControl = (props) => {
    return (
        <Col xs="12" sm="6">
            <Form.Label htmlFor={props.id} srOnly>
                {props.label}
            </Form.Label>
            <Form.Control
                className="mb-2"
                id={props.id}
                placeholder={props.placeholder}
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                autoComplete="off"
            />
        </Col>
    );
}

export default ProductFormControl;
