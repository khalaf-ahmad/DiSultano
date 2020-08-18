import { takeEvery } from 'redux-saga/effects';
import { fetch_users_saga, save_user_saga, delete_user_saga } from "./users";
import * as actionTypes from '../actions/actionTypes';


export function* watchUsers() {
    yield takeEvery(actionTypes.FETCH_USERS_INITIATE, fetch_users_saga);
    yield takeEvery(actionTypes.SAVE_USER_INIT, save_user_saga);
    yield takeEvery(actionTypes.DELETE_USER_INIT, delete_user_saga);
}