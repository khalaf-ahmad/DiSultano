import * as actionTypes from '../actions/actionTypes';
import { updateObject, on_action_fail, on_action_start } from '../../shared/utility';

const initialState = {
    categories: [],
    loading: false,
    error: ""
};

const on_fetch_success = (state, action) => {
    return updateObject(state, { categories: action.categories, loading: false });
};

const on_add_success = (state, action) => {
    const new_categories = [...state.categories, action.category];
    return updateObject(state, { categories: new_categories, loading: false });
};

const on_update_success = (state, action) => {
    const idx = state.categories.findIndex(ctr => ctr.id === action.category.id);
    if (idx >= 0) {
        const new_categories = [...state.categories];
        new_categories[idx] = { ...action.category };
        return updateObject(state, {
            categories: new_categories,
            loading: false
        });
    }
    return state;
};

const on_delete_success = (state, action) => {
    const new_categories = state.categories.filter(ctr =>
        ctr.id !== action.category_id);
    return updateObject(state, {
        categories: new_categories,
        loading: false
    });
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CATEGORY_START:
            return on_action_start(state, action);
        case actionTypes.FETCH_CATEGORY_SUCCESS:
            return on_fetch_success(state, action);
        case actionTypes.FETCH_CATEGORY_FAIL:
            return on_action_fail(state, action);
        case actionTypes.ADD_CATEGORY_START:
            return on_action_start(state, action);
        case actionTypes.ADD_CATEGORY_SUCCESS:
            return on_add_success(state, action);
        case actionTypes.ADD_CATEGORY_FAIL:
            return on_action_fail(state, action);
        case actionTypes.UPDATE_CATEGORY_START:
            return on_action_start(state, action);
        case actionTypes.UPDATE_CATEGORY_SUCCESS:
            return on_update_success(state, action);
        case actionTypes.UPDATE_CATEGORY_FAIL:
            return on_action_fail(state, action);
        case actionTypes.DELETE_CATEGORY_START:
            return on_action_start(state, action);
        case actionTypes.DELETE_CATEGORY_SUCCESS:
            return on_delete_success(state, action);
        case actionTypes.DELETE_CATEGORY_FAIL:
            return on_action_fail(state, action);
        default:
            return state;
    };
};
export default reducer;