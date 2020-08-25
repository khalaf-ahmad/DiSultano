import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';
const CategoryForm = ({ category, clear_clicked, submit_clicked, name_changed }) => {
    return (
      <Form className="mt-auto">
        <Form.Row className="align-items-center justify-content-between">
          <Col>
            <Form.Label htmlFor="inlineFormInput" srOnly>
              Name
            </Form.Label>
            <Form.Control
              className="mb-2"
              id="categoryNameInput"
              placeholder="Category Name"
              value={category.name}
              onChange={name_changed}
              autoComplete="off"
            />
          </Col>
          <Col xs="12" className="d-flex justify-content-between">
            <Button
              onClick={clear_clicked}
              type="reset"
              disabled={!category.name}
              variant="outline-secondary"
              className="mb-2"
            >
              Clear
            </Button>
            <Button
              onClick={submit_clicked}
              type="submit"
              disabled={!category.name}
              variant="outline-success"
              className="mb-2"
            >
              {category.id ? "Update" : "Add"}
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
}

export default CategoryForm;
