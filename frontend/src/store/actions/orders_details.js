import * as actionTypes from './actionTypes';

export const fetch_orders_details = () => {
  return {
    type: actionTypes.FETCH_ORDERS_DETAILS
  };
};

export const fetch_orders_details_start = () => {
  return {
    type: actionTypes.FETCH_ORDERS_DETAILS_START
  };
};

export const fetch_orders_details_fail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_DETAILS_FAIL,
    error
  };
};

export const fetch_orders_details_success = (data) => {
  return {
    type: actionTypes.FETCH_ORDERS_DETAILS_SUCCESS,
    data
  };
};

export const update_detail_state = (detail_id, status) => {
  return {
    type: actionTypes.UPDATE_DETAIL_STATE,
    detail_id,
    status
  };
};

export const update_detail_state_start = () => {
  return {
    type: actionTypes.UPDATE_DETAIL_STATE_START
  };
};

export const update_detail_state_success = (detail_id, status) => {
  return {
    type: actionTypes.UPDATE_DETAIL_STATE_SUCCESS,
    detail_id,
    status
  };
};

export const update_detail_state_fail = (error) => {
  return {
    type: actionTypes.UPDATE_DETAIL_STATE_FAIL,
    error
  };
};