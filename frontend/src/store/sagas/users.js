import { put } from 'redux-saga/effects';
import axios from '../../axios-base';
import * as actions from '../actions';
import { get_error_message } from '../../shared/utility';

export function* fetch_users_saga(action) {
    yield put(actions.fetch_users_start());
    try {
        const response = yield axios.get('/users');
        yield put(actions.fetch_users_succeed(response.data.users));
    } catch (error) {
        yield put(actions.fetch_users_fail(get_error_message(error)))
    }
}


export function* save_user_saga(action) {
    yield put(actions.save_user_start());
    try {
        const response = yield axios.put('/user', action.user);
        yield put(actions.save_user_success(response.data.user));
    } catch (error) {
        yield put(actions.save_user_fail(get_error_message(error)));
    }
}

export function* delete_user_saga(action) {
    yield put(actions.delete_user_start());
    try {
        yield axios.delete('/user', {data: {id: action.userId}});
        yield put(actions.delete_user_success(action.userId));
    } catch (error) {
        yield put(actions.delete_user_fail(get_error_message(error)));
    }
}