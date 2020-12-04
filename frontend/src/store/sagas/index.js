import { takeEvery, all } from 'redux-saga/effects';
import { fetch_users_saga, save_user_saga, delete_user_saga } from "./users";
import {
  fetch_category_saga, add_category_saga,
  delete_category_saga,update_category_saga
} from './category';
import {
  fetch_product_saga, add_product_saga,
  delete_product_saga, update_product_saga
} from './product';

import {
  fetch_orders_saga, add_order_saga,
  delete_order_saga, update_order_saga,
  print_order_saga
} from './order_builder';
import * as actionTypes from '../actions/actionTypes';

import {
  fetch_orders_details_saga,
  update_detail_state_saga
} from './orders_details';

// Users Sagas Watcher
export function* watchUsers() {
  yield all([
    takeEvery(actionTypes.FETCH_USERS_INITIATE, fetch_users_saga),
    takeEvery(actionTypes.SAVE_USER_INIT, save_user_saga),
    takeEvery(actionTypes.DELETE_USER_INIT, delete_user_saga)
  ]);
}

// Categories Sagas Watcher
export function* watchCategories() {
  yield all([
    takeEvery(actionTypes.FETCH_CATEGORY, fetch_category_saga),
    takeEvery(actionTypes.ADD_CATEGORY, add_category_saga),
    takeEvery(actionTypes.DELETE_CATEGORY, delete_category_saga),
    takeEvery(actionTypes.UPDATE_CATEGORY, update_category_saga)
  ]);
}

// Products Sagas Watcher
export function* watchProducts() {
  yield all([
    takeEvery(actionTypes.FETCH_PRODUCT, fetch_product_saga),
    takeEvery(actionTypes.ADD_PRODUCT, add_product_saga),
    takeEvery(actionTypes.DELETE_PRODUCT, delete_product_saga),
    takeEvery(actionTypes.UPDATE_PRODUCT, update_product_saga)
  ]);
}


// Orders Sagas Watcher
export function* watchOrders() {
  yield all(
    [
      takeEvery(actionTypes.FETCH_ORDERS, fetch_orders_saga),
      takeEvery(actionTypes.ADD_ORDER, add_order_saga),
      takeEvery(actionTypes.UPDATE_ORDER, update_order_saga),
      takeEvery(actionTypes.DELETE_ORDER, delete_order_saga),
      takeEvery(actionTypes.PRINT_ORDER, print_order_saga)
    ]
  );
}

// Orders Details Sagas Watcher
export function* watchOrdersDetails() {
  yield all(
    [
      takeEvery(actionTypes.FETCH_ORDERS_DETAILS, fetch_orders_details_saga),
      takeEvery(actionTypes.UPDATE_DETAIL_STATE, update_detail_state_saga)
    ]
  );
}