import React from "react";
import { Modal, Form, ListGroup, Button } from "react-bootstrap";
import { MdAdd } from "react-icons/md";

const UsersModal = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.on_close}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Receiver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          className="mb-2 mt-2"
          placeholder="Filter Users"
          autoComplete="off"
          onChange={props.text_changed}
        />
        <ListGroup
          variant="flush"
          as="ul"
          className="text-capitalize rounded-0 text-lead"
          style={{maxHeight: '400px', overflow: "auto"}}
        >
          {props.users.map((user) => (
            <ListGroup.Item
              as="li"
              action
              className="d-flex justify-content-between"
              key={user.id}
              variant="warning"
            >
              <span>{user.name}</span>
              <MdAdd
                role="button"
                className="text-bg"
                onClick={() => props.add_clicked(user)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.on_close}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UsersModal;
