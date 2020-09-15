import React,{useState} from 'react';
import { Col, Form, Card, Modal, Button } from 'react-bootstrap';
import { FaTrashAlt, FaSave } from 'react-icons/fa';


const User = (props) => {
  const { name, username, role, activated, role_change,
    status_change, changed, save_clicked, delete_clicked, } = props;
  const [show, set_show] = useState(false);
  const handle_close = () => set_show(false);
  const alert = (
    <Modal show={show} onHide={handle_close}>
      <Modal.Header closeButton>
        <Modal.Title>Deleting user {name}!</Modal.Title>
      </Modal.Header>
      <Modal.Body>do you want to continue?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handle_close}>
          no
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            handle_close();
            delete_clicked();
          }}
        >
          yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
  return (
    <Col  sm="6" md="4">
      {alert}
      <Card
        style={{ width: "100%" }}
        className="mb-2"
        border={activated? 'success' : 'light'}
      >
        <Card.Header style={{color: 'darkorchid'}} >{username}</Card.Header>
        <Card.Body>
          <Card.Title className="text-success" >{name}</Card.Title>
          <Form>
            <Form.Check
              type="switch"
              id={"custom-switch" + username}
              label={activated ? "activated" : "deactivated"}
              checked={activated}
              onChange={status_change}
              className="text-danger"
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
              <FaTrashAlt size="25" color="red" onClick={() => set_show(true)} />
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
