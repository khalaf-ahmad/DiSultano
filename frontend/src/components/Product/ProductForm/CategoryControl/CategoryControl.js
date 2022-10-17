import React from 'react';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

function CategoryControl({ category_id, input_changed }) {
  const categories = useSelector((state) => state.category.categories);
  return (
    <>
      <Form.Label htmlFor="category" srOnly>
        Category
      </Form.Label>
      <Form.Control
        as="select"
        className="mb-2"
        id="productCategorySelect"
        name="category_id"
        custom
        value={category_id}
        onChange={input_changed}
      >
        <option key={0} value={0}>
          Choose Category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Form.Control>
    </>
  );
}

export default CategoryControl;
