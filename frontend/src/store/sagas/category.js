import { put } from 'redux-saga/effects';
import axios from '../../axios-base';
import * as actions from '../actions';

export function* fetch_category_saga(action) {
  yield put(actions.fetch_categories_start());
  try {
    const response = yield axios.get('/categories', {
      params: {
        details: action.details,
      },
    });
    yield put(actions.fetch_categories_success(response.data.categories));
  } catch (error) {
    yield put(actions.fetch_categories_fail(error));
  }
}

export function* add_category_saga(action) {
  yield put(actions.add_category_start());
  try {
    const response = yield axios.post('/category', { name: action.category_name });
    yield put(actions.add_category_success(response.data.category));
  } catch (error) {
    yield put(actions.add_category_fail(error));
  }
}

export function* update_category_saga(action) {
  yield put(actions.update_category_start());
  try {
    const response = yield axios.put('/category', action.category);
    yield put(actions.update_category_success(response.data.category));
  } catch (error) {
    yield put(actions.update_category_fail(error));
  }
}

export function* delete_category_saga(action) {
  yield put(actions.delete_category_start());
  try {
    yield axios.delete('/category', { data: { id: action.category_id } });
    yield put(actions.delete_category_success(action.category_id));
  } catch (error) {
    yield put(actions.delete_category_fail(error));
  }
}
