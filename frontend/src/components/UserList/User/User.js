import React from 'react';
import { Col, Form, Card } from 'react-bootstrap';
import { FaTrashAlt, FaSave } from 'react-icons/fa';


const User = (props) => {
  const { name, username, role, activated, role_change,
    status_change, changed, save_clicked, delete_clicked, } = props;
  return (
    <Col xs="12" sm="6" md="4">
      <Card
        bg={activated ? "light" : "dark"}
        text={!activated ? "light" : "dark"}
        style={{ width: "100%" }}
        className="mb-2"
      >
        <Card.Header>{username}</Card.Header>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Form>
            <Form.Check
              type="switch"
              id={"custom-switch" + username}
              label={activated ? "activated" : "deactivated"}
              checked={activated}
              onChange={status_change}
            />
            <Form.Group controlId={"ControlSelect" + username}>
              <Form.Control
                onChange={role_change}
                className="mt-3"
                as="select"
                value={role}
              >
                <option value="1">Guest</option>
                <option value="2">Admin</option>
              </Form.Control>
            </Form.Group>
            <div className="mt-5 d-flex justify-content-between">
              <FaTrashAlt size="25" color="red" onClick={delete_clicked} />
              {changed ? (
                <FaSave size="25" color="green" onClick={save_clicked} />
              ) : null}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default User;
