import React from 'react';
import { Col, Row, Form } from 'react-bootstrap';
import FromInputControl from '../../../UI/FromInputControl/FromInputControl';
import CategoryControl from '../CategoryControl/CategoryControl';
import FormButtonsControls from './FormButtonsControls/FormButtonsControls';
import ReceiversControls from './ReceiversControl/ReceiversControl';

const controls = [
  { name: 'name', label: 'Product Name', type: 'text' },
  { name: 'price', label: 'Price', type: 'number' },
];

function ProductFormControls(props) {
  const column_grid = { xs: 12, sm: 6 };
  const first_row_controls = controls.map((control) => (
    <Col {...column_grid} key={control.name}>
      <FromInputControl
        name={control.name}
        id={`product${control.name}Input`}
        placeholder={control.label}
        value={props.product[control.name]}
        onChange={props.input_changed}
        type={control.type}
        label={control.label}
      />
    </Col>
  ));

  const category_list_control = (
    <Col {...column_grid}>
      <CategoryControl
        category_id={props.product.category.id}
        input_changed={props.input_changed}
      />
    </Col>
  );

  const form_button_controls = (
    <Col className="d-flex justify-content-between mt-2 mb-2">
      <FormButtonsControls
        handleShow={props.handleShow}
        clear_clicked={props.clear_clicked}
        product={props.product}
        delete_product_clicked={props.delete_product_clicked}
        submit_clicked={props.submit_clicked}
        disable_update={props.disable_update}
      />
    </Col>
  );

  const file_control = (
    <Col {...column_grid}>
      <Form.File
        onChange={props.image_changed}
        className="mb-2"
        id="custom-file"
        label={props.product.image_form ? props.product.image_form.name : 'Image'}
        custom
      />
    </Col>
  );

  const receivers_controls = (
    <Col className="d-flex flex-column justify-content-between">
      <ReceiversControls
        handle_receiver_search={props.handle_receiver_search}
        product_receivers={props.product_recievers}
        delete_clicked={props.delete_receiver}
      />
    </Col>
  );

  return (
    <>
      <Row>{first_row_controls}</Row>
      <Row>
        {category_list_control}
        {file_control}
      </Row>
      <Row style={{ maxHeight: '150px', overflow: 'auto' }}>{receivers_controls}</Row>
      <Row>{form_button_controls}</Row>
    </>
  );
}

export default ProductFormControls;
