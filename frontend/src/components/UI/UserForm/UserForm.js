import React from 'react';
import { Col, Form, Button, Alert } from 'react-bootstrap';
import FormControl from './FormControl/FormControl';

const UserForm = (props) => {
    return (
      <Col xs={12} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }}>
        {props.displayMessage && (
          <Alert variant={props.category}>{props.displayMessage}</Alert>
        )}
        <Form onSubmit={(event) => props.handleSubmit(event)}>
          {Object.keys(props.controls).map((cKey, idx) => (
            <FormControl
              changeHandler={(event) => props.changeHandler(event)}
              control={props.controls[cKey]}
              name={cKey}
              key={cKey + idx}
            />
          ))}
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit">
              {props.submitText}
            </Button>
          </div>
        </Form>
      </Col>
    );
}

export default UserForm;
