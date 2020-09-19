import React, { useState } from "react";
import { Col, Card } from "react-bootstrap";
import UserForm from "./UserForm/UserForm";
import QuestionModal from "../../UI/QuestionModal/QuestionModal";

const User = (props) => {
  const [show_modal, set_show_modal] = useState(false);

  const handle_delete_user = () => {
    props.delete_clicked();
    set_show_modal(false);
  };

  const close_modal = () => set_show_modal(false);
  const open_modal = () => set_show_modal(true);

  const delete_modal = (
    <QuestionModal
      show={show_modal}
      submit_clicked={handle_delete_user}
      title={`Deleting User ${props.name}!`}
      close_clicked={close_modal}
    />
  );

  return (
    <Col sm="6" md="4">
      {alert}
      {delete_modal}
      <Card
        style={{ width: "100%" }}
        className="mb-2"
        border={props.activated ? "success" : "light"}
      >
        <Card.Header style={{ color: "darkorchid" }}>
          {props.username}
        </Card.Header>
        <Card.Body>
          <Card.Title className="text-success">{props.name}</Card.Title>
          <UserForm {...props} open_modal={open_modal} />
        </Card.Body>
      </Card>
    </Col>
  );
};

export default User;
