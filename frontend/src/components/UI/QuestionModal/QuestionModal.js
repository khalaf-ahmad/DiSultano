import React from "react";
import { Modal, Button } from "react-bootstrap";

const QuestionModal = (props) => {
  return (
    <Modal show={props.show} onHide={props.close_clicked}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to continue?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.close_clicked}>
          no
        </Button>
        <Button variant="danger" onClick={props.submit_clicked}>
          yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionModal;
