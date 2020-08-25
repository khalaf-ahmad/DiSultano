import * as actionTypes from '../actions/actionTypes';
import { updateObject, on_action_fail, on_action_start } from '../../shared/utility';

const initialState = {
    products: [],
    loading: false,
    error: ""
};

const on_fetch_success = (state, action) => {
    return updateObject(state, { products: action.products, loading: false });
};

const on_add_success = (state, action) => {
    const new_products = [...state.products, action.product];
    return updateObject(state, { products: new_products, loading: false });
};

const on_update_success = (state, action) => {
    const idx = state.products.findIndex((prd) => prd.id === action.product.id);
    if (idx >= 0) {
        const new_products = [...state.products];
        new_products[idx] = { ...action.product };
        return updateObject(state, {
            products: new_products,
            loading: false
        });
    }
    return state;
};

const on_delete_success = (state, action) => {
    const new_products = state.products.filter(prd =>
        prd.id !== action.product_id);
    return updateObject(state, {
        products: new_products,
        loading: false
    });
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT_START:
            return on_action_start(state, action);
        case actionTypes.FETCH_PRODUCT_SUCCESS:
            return on_fetch_success(state, action);
        case actionTypes.FETCH_PRODUCT_FAIL:
            return on_action_fail(state, action);
        case actionTypes.ADD_PRODUCT_START:
            return on_action_start(state, action);
        case actionTypes.ADD_PRODUCT_SUCCESS:
            return on_add_success(state, action);
        case actionTypes.ADD_PRODUCT_FAIL:
            return on_action_fail(state, action);
        case actionTypes.UPDATE_PRODUCT_START:
            return on_action_start(state, action);
        case actionTypes.UPDATE_PRODUCT_SUCCESS:
            return on_update_success(state, action);
        case actionTypes.UPDATE_PRODUCT_FAIL:
            return on_action_fail(state, action);
        case actionTypes.DELETE_PRODUCT_START:
            return on_action_start(state, action);
        case actionTypes.DELETE_PRODUCT_SUCCESS:
            return on_delete_success(state, action);
        case actionTypes.DELETE_PRODUCT_FAIL:
            return on_action_fail(state, action);
        default:
            return state;
    };
};
export default reducer;