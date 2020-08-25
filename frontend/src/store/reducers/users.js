import * as actionTypes from '../actions/actionTypes';
import { updateObject, on_action_fail, on_action_start } from '../../shared/utility';

const initialState = {
    users: [],
    loading: false,
    error: ""
}


const fetch_success = (state, action) => {
    return updateObject(state, { loading: false, users: action.users });
}

const users_before_updated = {};

const compare_users_equality = (user1, user2) => {
    return Object.getOwnPropertyNames(user1).every(key => {
        if (key === "changed") {
            return true;
        }
        return user1[key] === user2[key];
    });
}


const update_user = (state, username, inner_object) => {
    const index = state.users.findIndex((urs) => urs.username === username);
    if (index >= 0) {
        let user = {
            ...state.users[index],
        };
        let initial = { ...user };
        if (!users_before_updated[user.username]) {
            users_before_updated[user.username] = {...user}
        } else {
            initial = users_before_updated[user.username];
        }
        user = { ...user, ...inner_object };
        user.changed = !compare_users_equality(initial, user);
        const updated_users = [...state.users];
        updated_users[index] = user;
        return updateObject(state, { users: updated_users });
    }
    return updateObject(state, { loading: false });
}
const update_user_status = (state, action) => {
    return update_user(state ,action.username, { activated: action.activated });
};

const update_user_role = (state, action) => {
    return update_user(state, action.username, { role: action.role });
};



const save_user_success = (state, action) => {
    const user = action.user;
    delete_cached_user(user);
    const index = state.users.findIndex(usr => usr.username === user.username);
    if (index >= 0) {
        let updated_users = [...state.users];
        updated_users[index] = user;
        return updateObject(state, { users: updated_users, loading: false });
    }
    return updateObject(state, { loading: false });
}

const delete_cached_user = (user) => {
    if (users_before_updated[user.username]) {
        delete users_before_updated[user.username];
    }
};

const delete_user_success = (state, action) => {
    const index = state.users.findIndex(usr => usr.id === action.userId);
    if (index >= 0) {
        delete_cached_user(state.users[index]);
        let updated_users = [...state.users];
        updated_users.splice(index, 1);
        return updateObject(state, { loading: false, users: updated_users });
    }
    return updateObject(state, { loading: false });
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USERS_START: return on_action_start(state, action);
        case actionTypes.FETCH_USERS_SUCCESS: return fetch_success(state, action);
        case actionTypes.FETCH_USERS_FAIL: return on_action_fail(state, action);
        case actionTypes.UPDATE_USER_STATUS: return update_user_status(state, action);
        case actionTypes.UPDATE_USER_ROLE: return update_user_role(state, action);
        case actionTypes.SAVE_USER_START: return on_action_start(state, action);
        case actionTypes.SAVE_USER_SUCESS: return save_user_success(state, action);
        case actionTypes.SAVE_USER_FAIL: return on_action_fail(state, action);
        case actionTypes.DELETE_USER_START: return on_action_start(state, action);
        case actionTypes.DELETE_USER_SUCCESS: return delete_user_success(state, action);
        case actionTypes.DELETE_USER_FAIL: return on_action_fail(state, action);
        default: return state;
    }
};

export default reducer;