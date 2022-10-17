import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import * as actions from '../../../store/actions';

const initial_category = { id: 0, name: '', products: [] };
const get_initial_category = () => ({ ...initial_category });

function CategoryList({ category_changed }) {
  // Component State
  const [selected_category, setCategory] = useState(get_initial_category());

  const dispatch = useDispatch();

  // Getting categories from redux state
  const categories = useSelector((state) => state.category.categories);

  // Mapp to fetch categories action
  const fetch_categories = useCallback(() => dispatch(actions.fetch_categories(true)), [dispatch]);

  const on_select_category = useCallback((category) => setCategory({ ...category }), []);

  useEffect(() => {
    fetch_categories();
  }, [fetch_categories]);

  useEffect(() => {
    category_changed(selected_category);
  }, [category_changed, selected_category]);

  return (
    <ListGroup variant="flush" role="button" as="ul" className="text-capitalize">
      {categories.map((category) => (
        <ListGroup.Item
          as="li"
          className="cursor-pointer"
          action
          active={category.id === selected_category.id}
          key={category.id}
          onClick={() => on_select_category(category)}
        >
          {category.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default React.memo(CategoryList);
