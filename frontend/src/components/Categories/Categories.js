import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup, Spinner, Alert } from 'react-bootstrap';
import {MdClear} from 'react-icons/md';
import CategoryForm from './CategoryForm/CategoryForm';
import * as actionTypes from "../../store/actions/category";

const initial_category = { id: 0, name: "" };
const style = {
  maxHeight: "calc( 100vh - 210px)",
  overflow: "auto",
};
const Categories = () => {
  const [selected_category, setCategory] = useState({ ...initial_category });

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector(state => state.category.loading);
  const error = useSelector(state => state.category.error);

  const fetch_categories = useCallback(
    () => dispatch(actionTypes.fetch_categories(false)),
    [dispatch]
  );

  const delete_category = useCallback(
    (category_id) => dispatch(actionTypes.delete_category(category_id)),
    [dispatch]
  );

  const add_category = useCallback(
    (category_name) => dispatch(actionTypes.add_category(category_name)),
    [dispatch]
  );

  const update_category = useCallback(
    (category) => dispatch(actionTypes.update_category(category)),
    [dispatch]
  );

  useEffect(() => {
    fetch_categories();
  }, [fetch_categories]);

  const handle_delete = (event, category_id) => {
    event.stopPropagation();
    delete_category(category_id);
    reset_category();
  }

  const handle_submit = (event) => {
    event.preventDefault();
    if (selected_category.id === 0) {
      add_category(selected_category.name);
    } else {
      update_category(selected_category);
    }
    reset_category();
  };

  const on_select_category = (category) => setCategory({ ...category });
  const reset_category = () => setCategory({ ...initial_category });

  const handle_name_change = (event) => {
    const name = event.target.value;
    setCategory((prevState) => {
      return {
        ...prevState,
        name
      }
    })
  };
  return (
    <React.Fragment>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup
        style={style}
        role='button'
        as="ul"
        className="text-capitalize rounded-0 text-lead  mb-2"
      >
        {categories.map((category) => (
          <ListGroup.Item
            as="li"
            action
            active={category.id === selected_category.id}
            className="d-flex justify-content-between"
            key={category.id}
            onClick={() => on_select_category(category)}
            variant="warning"
          >
            <span>{category.name}</span>
            <MdClear
              role="button"
              className="text-bg"
              onClick={(event) => handle_delete(event, category.id)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>
      <CategoryForm
        clear_clicked={() => reset_category()}
        submit_clicked={(event) => handle_submit(event)}
        name_changed={(event) => handle_name_change(event)}
        category={selected_category}
      />
      {loading && (
        <Spinner
          variant="danger"
          animation="grow"
          style={{ position: "absolute", right: "50%", top: "50%" }}
          size="sm"
        >
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
    </React.Fragment>
  );
}

export default Categories;
