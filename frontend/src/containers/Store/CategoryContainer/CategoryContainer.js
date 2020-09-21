import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner, Alert } from "react-bootstrap";
import CategoryForm from "../../../components/Category/CategoryForm/CategoryForm";
import * as actionTypes from "../../../store/actions/category";
import CategoryList from "../../../components/Category/CategoryList/CategoryList";

const initial_category = { id: 0, name: "" };

const status_position_style = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: "3031",
};

const Categories = () => {
  const [selected_category, setCategory] = useState({ ...initial_category });

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const loading = useSelector((state) => state.category.loading);
  const error = useSelector((state) => state.category.error);

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
  };

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
        name,
      };
    });
  };

  const spinner = (
    <Spinner
      variant="danger"
      animation="grow"
      style={status_position_style}
      size="sm"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );

  const alert =  <Alert style={status_position_style} variant="danger">{error}</Alert>
  return (
    <React.Fragment>
      {error && alert}
      {loading && spinner}
      <CategoryList
        categories={categories}
        selected_category={selected_category}
        delete_clicked={handle_delete}
        item_selected={on_select_category}
      />
      <CategoryForm
        clear_clicked={() => reset_category()}
        submit_clicked={(event) => handle_submit(event)}
        name_changed={(event) => handle_name_change(event)}
        category={selected_category}
      />
    </React.Fragment>
  );
};

export default Categories;
