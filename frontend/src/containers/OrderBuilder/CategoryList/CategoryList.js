import React,{ useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';
import * as actions from '../../../store/actions';

// Category list component
const CategoryList = (props) => {

  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.categories);

  const fetch_categories = useCallback(
    () => dispatch(actions.fetch_categories(true)),
    [dispatch]
  );

  useEffect(() => {
    fetch_categories();
  }, [fetch_categories]);

  return (
    <ListGroup
      variant="flush" role="button" as="ul" className="text-capitalize">
      {categories.map((category) => (
        <ListGroup.Item
          as="li"
          className="cursor-pointer"
          action
          active={category.id === props.selected_category.id}
          key={category.id}
          onClick={() => props.category_clicked(category)}
        >
          {category.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};


export default CategoryList;