import { put } from 'redux-saga/effects';
import axios from '../../axios-base';
import * as actions from '../actions';

export function* fetch_orders_details_saga(action) {
  yield put(actions.fetch_orders_details_start());
  try {
    const response = yield axios.get('/order_detail');
    yield put(actions.fetch_orders_details_success(response.data));
  } catch (error) {
    yield put(actions.fetch_orders_details_fail(error));
  }
}

export function* update_detail_state_saga(action) {
  yield put(actions.update_detail_state_start());
  try {
    yield axios.put('/order_detail', {
      detail_id: action.detail_id,
      created: action.status
    });
    yield put(actions.update_detail_state_success(action.detail_id,
      action.status));
  } catch (error) {
    yield put(actions.update_detail_state_fail(error));
  }
}