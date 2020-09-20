import React from "react";
import { FaTrashAlt, FaSave } from "react-icons/fa";
import Form from "react-bootstrap/Form";

const UserForm = (props) => {
  return (
    <Form>
      <Form.Check
        type="switch"
        id={"custom-switch" + props.username}
        label={props.activated ? "activated" : "deactivated"}
        checked={props.activated}
        onChange={props.status_change}
        className="text-danger"
      />
      <Form.Group controlId={"ControlSelect" + props.username}>
        <Form.Control
          onChange={props.role_change}
          className="mt-3"
          as="select"
          value={props.role}
        >
          <option value="1">Guest</option>
          <option value="2">Admin</option>
        </Form.Control>
      </Form.Group>
      <div className="mt-5 d-flex justify-content-between">
        <FaTrashAlt
          role="button"
          size="25"
          color="red"
          onClick={props.open_modal}
        />
        {props.changed ? (
          <FaSave
            role="button"
            size="25"
            color="green"
            onClick={props.save_clicked}
          />
        ) : null}
      </div>
    </Form>
  );
};

export default UserForm;
