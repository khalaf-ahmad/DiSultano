import React, {useEffect, useState} from 'react';
import { Form, Button, Col, ListGroup, Row, Modal, Badge, Card } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';
import ProductFormControl from './ProductFormControl/ProductFormControl';
import { MdClear, MdAdd } from 'react-icons/md';

const list_group_style = {
  height: "50px",
  maxHeight: "50px",
  overFlow: "auto",
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
  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [product_recievers, set_recievers] = useState([]);

  const [user_list, set_user_list] = useState([...props.users]);

    useEffect(() => {
      set_recievers([...props.product.receivers]);
    }, [props.product.receivers]);

  const handle_receiver_search = (event) => {
    const text_to_search = event.target.value;
    const result = props.product.receivers.filter(rec => rec.name.toLowerCase().indexOf(text_to_search.toLowerCase()) >= 0 );
    if (result.length) {
      set_recievers(result);
    } else {
      set_recievers([...props.product.receivers]);
    }
  }
  
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
    <ProductFormControl
      id="name"
      placeholder="Product Name"
      value={props.product.name}
      onChange={props.input_changed}
      label="Name"
    />
  );

  const price_control = (
    <ProductFormControl
      id="price"
      placeholder="Price"
      value={props.product.price}
      onChange={props.input_changed}
      label="Price"
      type="number"
    />
  );

  const category_list_control = (
    <Col {...column_grid}>
      <Form.Label htmlFor="category" srOnly>
        Category
      </Form.Label>
      <Form.Control
        as="select"
        className="mb-2"
        id="category"
        custom
        value={props.product.category.id}
        onChange={props.category_changed}
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
        label={props.product.image.name ?
          props.product.image.name: "Image" }
        custom
      />
    </Col>
  );

  const recievers_control = (
    <Col>
      <Form.Control
        className="mb-2 mt-2"
        placeholder="Filter Receivers"
        autoComplete="off"
        onChange={(event) => handle_receiver_search(event)}
      />
      {product_recievers.length === 0 ? <hr /> : null}

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
        {user_list.map((user) => (
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
              onClick={() => props.add_user_clicked(user)}
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
    // <Col {...column_grid}>
    //   <Form.Control
    //     className="mb-2 mt-2"
    //     placeholder="Filter Users"
    //     autoComplete="off"
    //     onChange={(event) => handle_user_search(event)}
    //   />
    //   <ListGroup
    //     variant="flush"
    //     as="ul"
    //     className="text-capitalize rounded-0 text-lead"
    //   >
    //     {user_list.map((user) => (
    //       <ListGroup.Item
    //         as="li"
    //         action
    //         className="d-flex justify-content-between"
    //         key={user.id}
    //         variant="warning"
    //       >
    //         <span>{user.name}</span>
    //         <MdAdd
    //           role="button"
    //           className="text-bg"
    //           onClick={() => props.add_user_clicked(user)}
    //         />
    //       </ListGroup.Item>
    //     ))}
    //   </ListGroup>
    // </Col>
  );

  const form_button_controls = (
    <Col  className="d-flex justify-content-between mt-2">
      <Button variant="warning" onClick={handleShow}>
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
      <Button
        onClick={props.submit_clicked}
        type="submit"
        variant="outline-success"
        className="mb-2"
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
