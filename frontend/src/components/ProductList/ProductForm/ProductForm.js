import bsCustomFileInput from 'bs-custom-file-input';
import React, { useEffect, useState } from 'react';
import {
  Badge, Button, Col, Form,
  ListGroup, Modal, Row
} from 'react-bootstrap';
import { MdAdd, MdClear } from 'react-icons/md';
import FromInputControl from "../../UI/FromInputControl/FromInputControl";

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
const ProductForm = props => {
  let users = props.users;
  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [product_recievers, set_recievers] = useState([]);

    useEffect(() => {
      set_recievers([...props.product.receivers]);
    }, [props.product.receivers]);

  const handle_receiver_search = (event) => {
    const text_to_search = event.target.value;
    const result = props.product.receivers.filter(rec => rec.name.toLowerCase()
      .indexOf(text_to_search.toLowerCase()) >= 0);
    if (result.length) {
      set_recievers(result);
    } else {
      set_recievers([...props.product.receivers]);
    }
  }

  const set_user_list = (users) => users = [...users];

  const handle_user_search = (event) => {
    const text_to_search = event.target.value;
    const result = props.users.filter(
      (rec) => rec.name.toLowerCase().indexOf(text_to_search.toLowerCase()) >= 0
    );
    if (result.length) {
      set_user_list(result);
    } else {
      set_user_list([...props.product.receivers]);
    }
  }
  const column_grid = { xs: 12, sm: 6 }


  const name_control = (
    <Col {...column_grid}>
      <FromInputControl
        name="name"
        id="productNameInput"
        placeholder="Product Name"
        value={props.product.name}
        onChange={props.input_changed}
        label="Name"
      />
    </Col>
  );

  const price_control = (
    <Col {...column_grid}>
      <FromInputControl
        name="price"
        id="productPriceInput"
        placeholder="Price"
        value={props.product.price}
        onChange={props.input_changed}
        label="Price"
        type="number"
      />
    </Col>
  );

  const category_list_control = (
    <Col {...column_grid}>
      <Form.Label htmlFor="category" srOnly>
        Category
      </Form.Label>
      <Form.Control
        as="select"
        className="mb-2"
        id="productCategorySelect"
        name="category_id"
        custom
        value={props.product.category_id}
        onChange={props.input_changed}
      >
        <option key={0} value={0}>
          Choose Category
        </option>
        {props.category_list.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Control>
    </Col>
  );

  const file_control = (
    <Col {...column_grid}>
      <Form.File
        onChange={props.image_changed}
        className="mb-2"
        id="custom-file"
        label={
          props.product.image_form ?
            props.product.image_form.name : "Image"
        }
        custom
      />
    </Col>
  );

  const recievers_control = (
    <Col className="d-flex flex-column justify-content-between">
      <Form.Control
        className="mb-2 mt-2"
        placeholder="Filter Receivers"
        autoComplete="off"
        onChange={(event) => handle_receiver_search(event)}
      />

      <div style={list_group_style}>
        {product_recievers.map((user) => (
          <Badge
            className="d-inline m-2 p-1 text-bg "
            key={user.id}
            variant={variants[Math.floor(Math.random() * 6)]}
          >
            <span>{user.name}</span>
            <MdClear
              role="button"
              className="text-bg"
              onClick={() => props.delete_user_clicked(user.id)}
            />
          </Badge>
        ))}
      </div>
      <dir style={{height: "2px", backgroundColor:"#e5e5e5"}} ></dir>
    </Col>
  );

  const users_control = (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Receiver</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
        className="mb-2 mt-2"
        placeholder="Filter Users"
        autoComplete="off"
        onChange={(event) => handle_user_search(event)}
      />
      <ListGroup
        variant="flush"
        as="ul"
        className="text-capitalize rounded-0 text-lead"
      >
        {users.map((user) => (
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
              onClick={() =>props.add_user_clicked(user)}
            />
          </ListGroup.Item>
        ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  const form_button_controls = (
    <Col className="d-flex justify-content-between mt-2">
      <Button variant="warning" className="mb-2" onClick={handleShow}>
        Add Receivers
      </Button>
      <Button
        onClick={props.clear_clicked}
        type="reset"
        variant="outline-secondary"
        className="mb-2"
      >
        Clear
      </Button>
      {props.product.id > 0 ? (
        <Button
          onClick={props.delete_product_clicked}
          type="button"
          variant="outline-danger"
          className="mb-2"
        >
          Delete
        </Button>
      ) : null}
      <Button
        onClick={props.submit_clicked}
        type="submit"
        variant="outline-success"
        className="mb-2"
        disabled={ props.product.id ? props.disable_update :
            !props.product.name || !props.product.price
        }
      >
        {props.product.id ? "Update" : "Add"}
      </Button>
    </Col>
  );
  return (
    <Form as={Col} className="mt-2">
      {users_control}
      <Row>
        {name_control}
        {price_control}
      </Row>
      <Row>
        {category_list_control}
        {file_control}
      </Row>
      <Row
        style={{
          maxHeight: "150px",
          overflow: "auto",
        }}
      >
        {recievers_control}
      </Row>
      <Row>{form_button_controls}</Row>
    </Form>
  );
}

export default ProductForm;
