import * as actionTypes from './actionTypes';

export const fetch_categories = (details) => {
  return {
    type: actionTypes.FETCH_CATEGORY,
    details,
  };
};

export const fetch_categories_start = () => {
  return {
    type: actionTypes.FETCH_CATEGORY_START,
  };
};

export const fetch_categories_success = (categories) => {
  return {
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    categories,
  };
};

export const fetch_categories_fail = (error) => {
  return {
    type: actionTypes.FETCH_CATEGORY_FAIL,
    error,
  };
};

export const add_category = (category_name) => {
  return {
    type: actionTypes.ADD_CATEGORY,
    category_name,
  };
};

export const add_category_start = () => {
  return {
    type: actionTypes.ADD_CATEGORY_START,
  };
};

export const add_category_success = (category) => {
  return {
    type: actionTypes.ADD_CATEGORY_SUCCESS,
    category,
  };
};

export const add_category_fail = (error) => {
  return {
    type: actionTypes.ADD_CATEGORY_FAIL,
    error,
  };
};

export const delete_category = (category_id) => {
  return {
    type: actionTypes.DELETE_CATEGORY,
    category_id,
  };
};

export const delete_category_start = () => {
  return {
    type: actionTypes.DELETE_CATEGORY_START,
  };
};

export const delete_category_success = (category_id) => {
  return {
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    category_id,
  };
};

export const delete_category_fail = (error) => {
  return {
    type: actionTypes.DELETE_CATEGORY_FAIL,
    error,
  };
};

export const update_category = (category) => {
  return {
    type: actionTypes.UPDATE_CATEGORY,
    category,
  };
};

export const update_category_start = () => {
  return {
    type: actionTypes.UPDATE_CATEGORY_START,
  };
};

export const update_category_success = (category) => {
  return {
    type: actionTypes.UPDATE_CATEGORY_SUCCESS,
    category,
  };
};

export const update_category_fail = (error) => {
  return {
    type: actionTypes.UPDATE_CATEGORY_FAIL,
    error,
  };
};
