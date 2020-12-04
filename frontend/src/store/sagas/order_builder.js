import { put, select } from 'redux-saga/effects';
import axios from '../../axios-base';
import * as actions from '../actions';
import { get_order_data } from '../../shared/utility';
import * as selectors from "../selectors";

export function* add_order_saga(action) {
    yield put(actions.add_order_start());
    try {
        const order = yield select(selectors.order);
        const data = get_order_data(order);
        const response = yield axios.post('/order', data);
        yield put(actions.add_order_success(response.data.order));
    } catch (error) {
        yield put(actions.add_order_fail(error));
    }
}

export function* update_order_saga(action) {
    yield put(actions.update_order_start());
    try {
        const order = yield select(selectors.order);
        const data = get_order_data(order);
        const response = yield axios.put('/order', data);
        yield put(actions.update_order_success(response.data.order));
    } catch (error) {
        yield put(actions.update_order_fail(error))
    }
}

export function* delete_order_saga(action) {
    yield put(actions.delete_order_start());
    try {
        yield axios.delete('/order', { data: { id: action.order_id } });
        yield put(actions.delete_order_success(action.order_id));
        yield put(actions.reset_order());
        yield put(actions.fetch_orders());
    } catch (error) {
        yield put(actions.delete_order_fail(error));
    }
}

export function* print_order_saga(action) {
  yield put(actions.print_order_start());
  try {
    yield axios.post("/print_order", { id: action.order_id } );
    yield put(actions.print_order_success());
  } catch (error) {
    yield put(actions.print_order_fail(error));
  }
}

export function* fetch_orders_saga(action) {
    yield put(actions.fetch_orders_start());
    try {
        let page = yield select(selectors.page);
        const order_list = yield select(selectors.order_list);
        if (page > 1 && order_list.length === 0)
            page -= 1;
        const response = yield axios.get('/orders',
            {
                params: { page: page},
            });
        yield put(actions.fetch_orders_success(response.data));
    } catch (error) {
        yield put(actions.fetch_orders_fail(error));
    }
}