import React from 'react';
import { Form, Badge } from 'react-bootstrap';
import { MdClear } from 'react-icons/md';

const list_group_style = {
  height: "50px",
  maxHeight: "50px",
  overflow: "auto",
};

const variants = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
];

const ReceiversControl = (props) => {
  return (
    <React.Fragment>
      <Form.Control
        className="mb-2 mt-2"
        placeholder="Filter Receivers"
        autoComplete="off"
        onChange={props.handle_receiver_search}
      />

      <div style={list_group_style}>
        {props.product_receivers.map((user) => (
          <Badge
            className="d-inline m-2 p-1 text-bg "
            key={user.id}
            variant={variants[Math.floor(Math.random() * 6)]}
          >
            <span>{user.name}</span>
            <MdClear
              role="button"
              className="text-bg"
              onClick={() => props.delete_clicked(user.id)}
            />
          </Badge>
        ))}
      </div>
      <dir style={{ height: "2px", backgroundColor: "#e5e5e5" }}></dir>
    </React.Fragment>
  );
}

export default ReceiversControl;
