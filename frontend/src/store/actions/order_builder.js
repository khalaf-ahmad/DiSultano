import *  as actionTypes from './actionTypes';


export const set_order = order => {
    return {
        type: actionTypes.SET_ORDER,
        order
    };
};

export const set_order_details = details => {
    return {
        type: actionTypes.SET_ORDER_DETAILS,
        details
    };
};

export const add_detail = detail => {
    return {
        type: actionTypes.ADD_ORDER_DETAIL,
        detail
    };
};

export const remove_detail = index => {
    return {
        type: actionTypes.REMOVE_ORDER_DETAIL,
        index
    };
};

export const update_detail = (detail) => {
    return {
        type: actionTypes.UPDATE_ORDER_DETAIL,
        detail,
    };
};

export const set_order_info = (customer_name, description) => {
    return {
        type: actionTypes.SET_ORDER_INFO,
        customer_name,
        description
    };
};

export const reset_order = () => {
    return {
        type: actionTypes.RESET_ORDER_INFO
    };
};

export const add_order = () => {
    return {
        type: actionTypes.ADD_ORDER
    };
};

export const add_order_start = () => {
    return {
        type: actionTypes.ADD_ORDER_START
    };
};

export const add_order_success = (order) => {
    return {
        type: actionTypes.ADD_ORDER_SUCCESS,
        order
    };
};

export const add_order_fail = (error) => {
    return {
        type: actionTypes.ADD_ORDER_FAIL,
        error
    };
};

export const delete_order = (order_id) => {
    return {
        type: actionTypes.DELETE_ORDER,
        order_id
    };
};

export const delete_order_start = () => {
    return {
        type: actionTypes.DELETE_ORDER_START
    };
};

export const delete_order_success = (order_id) => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        order_id
    }
}

export const delete_order_fail = (error) => {
    return {
        type: actionTypes.DELETE_ORDER_FAIL,
        error
    };
};

export const update_order = () => {
    return {
        type: actionTypes.UPDATE_ORDER
    };
};

export const update_order_start = () => {
    return {
        type: actionTypes.UPDATE_ORDER_START
    };
};

export const update_order_success = (order) => {
    return {
        type: actionTypes.UPDATE_ORDER_SUCCESS,
        order,
    };
};

export const update_order_fail = (error) => {
    return {
        type: actionTypes.UPDATE_ORDER_FAIL,
        error,
    };
};

export const print_order = (order_id) => {
  return {
    type: actionTypes.PRINT_ORDER,
    order_id,
  };
};

export const print_order_start = () => {
  return {
    type: actionTypes.PRINT_ORDER_START,
  };
};

export const print_order_success = () => {
  return {
    type: actionTypes.PRINT_ORDER_SUCCESS,
  };
};

export const print_order_fail = (error) => {
  return {
    type: actionTypes.PRINT_ORDER_FAIL,
    error,
  };
};

export const fetch_orders = () => {
    return {
        type: actionTypes.FETCH_ORDERS
    };
};

export const fetch_orders_start = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetch_orders_success = (data) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        data
    };
};

export const fetch_orders_fail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error
    };
};

export const increment_page = () => {
    return {
        type: actionTypes.INCREMENT_PAGE
    };
};

export const decrement_page = () => {
    return {
        type: actionTypes.DECREMENT_PAGE
    };
};