import { put } from 'redux-saga/effects';
import { get_product_form_data } from '../../shared/utility';
import axios from '../../axios-base';
import * as actions from '../actions';

export function* fetch_product_saga(action) {
    yield put(actions.fetch_products_start());
    try {
        const response = yield axios.get('/products', {
            params: {
                details: action.details
            }
        });
        yield put(actions.fetch_products_success(response.data.products));
    } catch (error) {
        yield put(actions.fetch_products_fail(error));
    }
}

export function* add_product_saga(action) {
    yield put(actions.add_product_start());
    try {
        const data = get_product_form_data(action.product);
        const response = yield axios.post('/product', data);
        yield put(actions.add_product_success(response.data.product));
    } catch (error) {
        yield put(actions.add_product_fail(error));
    }
}

export function* update_product_saga(action) {
    yield put(actions.update_product_start());
    try {
        const data = get_product_form_data(action.product);
        const response = yield axios.put('/product', data);
        yield put(actions.update_product_success(response.data.product));
    } catch (error) {
        yield put(actions.update_product_fail(error))
    }
}

export function* delete_product_saga(action) {
    yield put(actions.delete_product_start());
    try {
        yield axios.delete('/product', {data: {id: action.product_id}});
        yield put(actions.delete_product_success(action.product_id));
    } catch (error) {
        yield put(actions.delete_product_fail(error))
    }
}
