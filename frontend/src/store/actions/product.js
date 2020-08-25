import * as actionTypes from './actionTypes';

export const fetch_products = (details) => {
    return {
        type: actionTypes.FETCH_PRODUCT,
        details
    };
};

export const fetch_products_start = () => {
    return {
        type: actionTypes.FETCH_PRODUCT_START
    };
};

export const fetch_products_success = (products) => {
    return {
        type: actionTypes.FETCH_PRODUCT_SUCCESS,
        products
    };
};

export const fetch_products_fail = (error) => {
    return {
        type: actionTypes.FETCH_PRODUCT_FAIL,
        error
    };
};

export const add_product = (product) => {
    return {
        type: actionTypes.ADD_PRODUCT,
        product
    };
};

export const add_product_start = () => {
    return {
        type: actionTypes.ADD_PRODUCT_START
    };
};

export const add_product_success = (product) => {
    return {
        type: actionTypes.ADD_PRODUCT_SUCCESS,
        product
    };
};

export const add_product_fail = (error) => {
    return {
        type: actionTypes.ADD_PRODUCT_FAIL,
        error
    };
};

export const delete_product = (product_id) => {
    return {
        type: actionTypes.DELETE_PRODUCT,
        product_id
    };
};

export const delete_product_start = () => {
    return {
        type: actionTypes.DELETE_PRODUCT_START
    };
};

export const delete_product_success = (product_id) => {
    return {
        type: actionTypes.DELETE_PRODUCT_SUCCESS,
        product_id
    }
}

export const delete_product_fail = (error) => {
    return {
        type: actionTypes.DELETE_PRODUCT_FAIL,
        error
    };
};

export const update_product = (product) => {
    return {
        type: actionTypes.UPDATE_PRODUCT,
        product,
    };
};

export const update_product_start = () => {
    return {
        type: actionTypes.UPDATE_PRODUCT_START
    };
};

export const update_product_success = (product) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_SUCCESS,
        product,
    };
};

export const update_product_fail = (error) => {
    return {
        type: actionTypes.UPDATE_PRODUCT_FAIL,
        error,
    };
};