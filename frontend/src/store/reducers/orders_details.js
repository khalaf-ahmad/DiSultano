import * as actionTypes from '../actions/actionTypes';
import { on_action_fail, on_action_start, updateObject } from '../../shared/utility';

const initial_state = {
  created: [],
  waiting: [],
  loading: false,
  error: '',
};

const fetch_orders_details_success = (state, action) => {
  return updateObject(state, {
    created: [...action.data.created],
    waiting: [...action.data.waiting],
    loading: false,
    error: '',
  });
};

const switch_detail = (first, second, detail_id) => {
  const index = first.findIndex((dt) => dt.detail_id === detail_id);
  if (index > -1) {
    second.unshift(first[index]);
    first.splice(index, 1);
  }
};

const update_detail_state_success = (state, action) => {
  const { detail_id } = action;
  const created_status = action.status;
  const waiting = [...state.waiting];
  const created = [...state.created];
  if (created_status) {
    switch_detail(waiting, created, detail_id);
  } else {
    switch_detail(created, waiting, detail_id);
  }
  return updateObject(state, { waiting, created, loading: false });
};

const reducer = (state = initial_state, action) => {
  const { type } = action;
  switch (true) {
    case type === actionTypes.FETCH_ORDERS_DETAILS_SUCCESS:
      return fetch_orders_details_success(state, action);
    case type === actionTypes.UPDATE_DETAIL_STATE_SUCCESS:
      return update_detail_state_success(state, action);
    case type === actionTypes.UPDATE_DETAIL_STATE_START:
      return on_action_start(state, action);
    case type === actionTypes.FETCH_ORDERS_DETAILS_FAIL ||
      type === actionTypes.UPDATE_DETAIL_STATE_FAIL:
      return on_action_fail(state, action);
    default:
      return state;
  }
};

export default reducer;
