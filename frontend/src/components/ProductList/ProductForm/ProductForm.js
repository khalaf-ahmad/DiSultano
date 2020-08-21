import React, {useEffect} from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import bsCustomFileInput from 'bs-custom-file-input';

const ProductForm = ({ product, name_changed, price_changed, category_list }) => {
  useEffect(() => {
    bsCustomFileInput.init();
  }, [])
    return (
      <Form as={Col} className="mt-2">
        <Form.Row className="align-items-center justify-content-between">
          <Col xs="12" sm="6">
            <Form.Label htmlFor="productNameInput" srOnly>
              Name
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="productNameInput"
              placeholder="Product Name"
              value={product.name}
              onChange={name_changed}
              autoComplete="off"
            />
          </Col>
          <Col xs="12" sm="6">
            <Form.Label htmlFor="productPriceInput" srOnly>
              Price
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="productPriceInput"
              placeholder="Price"
              type="number"
              value={product.price}
              onChange={price_changed}
              autoComplete="off"
            />
          </Col>
          <Col xs="12" sm="6">
            <Form.Label htmlFor="productCategorySelect" srOnly>
              Category
            </Form.Label>
            <Form.Control
              as="select"
              className="mb-2"
              id="productCategorySelect"
              custom
            >
              {category_list.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            <Form.File id="custom-file" label="Product Image" custom />
          </Col>
          <Col xs="12" sm="6" className="d-flex justify-content-between">
            <Button
              // onClick={clear_clicked}
              type="reset"
              // disabled={!category.name}
              variant="outline-secondary"
              className="mb-2"
            >
              Clear
            </Button>
            <Button
              // onClick={submit_clicked}
              type="submit"
              variant="outline-success"
              className="mb-2"
            >
              {/* {category.id ? "Update" : "Add"} */}
              Submit
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
}

export default ProductForm;
