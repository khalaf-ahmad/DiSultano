import * as actionTypes from '../actions/actionTypes';
import { updateObject, on_action_fail, on_action_start } from '../../shared/utility';

const initial_state = {
  order: {
    id: 0,
    customer_name: '',
    description: '',
    total_price: 0,
    details: [],
  },
  order_list: [],
  page: 1,
  has_next: false,
  has_prev: false,
  total_orders: 0,
  pages: 0,
  loading: false,
  error: '',
};

const get_total_price = (details) => {
  return details.reduce((accr, detail) => accr + detail.detail_price * detail.quantity, 0);
};

const set_order = (state, action) => {
  return updateObject(state, { order: { ...action.order } });
};

const set_order_info = (state, action) => {
  const new_order_info = { ...state.order };
  new_order_info.customer_name = action.customer_name;
  new_order_info.description = action.description;
  return updateObject(state, { order: new_order_info });
};

const reset_order_info = (state) => {
  return updateObject(state, { order: { ...initial_state.order } });
};

const set_order_details = (state, action) => {
  const new_order = { ...state.order, details: [...action.details] };
  new_order.total_price = get_total_price(new_order.details);

  return updateObject(state, { order: new_order });
};

const add_detail = (state, action) => {
  const { detail } = action;
  const new_details = [...state.order.details, { ...action.detail }];
  const total_price = state.order.total_price + detail.detail_price * detail.quantity;
  return updateObject(state, {
    order: {
      ...state.order,
      details: new_details,
      total_price,
    },
  });
};

const remove_detail = (state, action) => {
  if (state.order.details[action.index]) {
    const detail = { ...state.order.details[action.index] };
    const new_details = [...state.order.details];
    new_details.splice(action.index, 1);
    const total_price = state.order.total_price - detail.detail_price * detail.quantity;
    return updateObject(state, {
      order: {
        ...state.order,
        details: new_details,
        total_price,
      },
    });
  }
  return state;
};

const update_detail = (state, action) => {
  const new_details = [...state.order.details];
  let total_price = 0;
  for (const detail of new_details) {
    if (detail.detail_id === action.detail.detail_id) {
      total_price -= detail.detail_price * detail.quantity;
      detail.product = { ...action.detail.product };
      detail.detail_price = action.detail.detail_price;
      detail.description = action.detail.description;
      detail.quantity = action.detail.quantity;
      total_price += detail.detail_price * detail.quantity;
      break;
    }
  }
  return updateObject(state, {
    order: {
      ...state.order,
      details: new_details,
      total_price: state.order.total_price + total_price,
    },
  });
};

const delete_order_success = (state, action) => {
  return {
    ...state,
    order: { ...initial_state.order },
    order_list: state.order_list.filter((ord) => ord.id !== action.order_id),
  };
};

const check_orders_length = (orders) => {
  while (orders.length > 12) {
    orders.pop();
  }
};

const add_order_success = (state, action) => {
  const new_orders = [{ ...action.order }, ...state.order_list];
  check_orders_length(new_orders);
  return updateObject(state, {
    order_list: new_orders,
    loading: false,
    order: { ...action.order },
    pages: state.pages === 0 ? 1 : state.pages,
  });
};

const update_order_success = (state, action) => {
  const order_list = [...state.order_list];
  for (const orderIndex in order_list) {
    if (order_list[orderIndex].id === state.order.id) {
      order_list[orderIndex] = { ...action.order };
      break;
    }
  }
  return updateObject(state, {
    order: { ...action.order },
    loading: false,
    order_list,
  });
};

const fetch_orders_success = (state, action) => {
  return updateObject(state, {
    order_list: [...action.data.orders],
    has_next: action.data.has_next,
    has_prev: action.data.has_prev,
    page: action.data.page,
    pages: action.data.pages,
    total_orders: action.data.total_orders,
    loading: false,
  });
};

const increment_page = (state) => {
  return updateObject(state, { page: state.page + 1 });
};

const decrement_page = (state) => {
  return updateObject(state, { page: state.page - 1 });
};

const reducer = (state = initial_state, action) => {
  const { type } = action;
  switch (true) {
    case type === actionTypes.SET_ORDER:
      return set_order(state, action);
    case type === actionTypes.SET_ORDER_INFO:
      return set_order_info(state, action);
    case type === actionTypes.SET_ORDER_DETAILS:
      return set_order_details(state, action);
    case type === actionTypes.ADD_ORDER_DETAIL:
      return add_detail(state, action);
    case type === actionTypes.UPDATE_ORDER_DETAIL:
      return update_detail(state, action);
    case type === actionTypes.REMOVE_ORDER_DETAIL:
      return remove_detail(state, action);
    case type === actionTypes.ADD_ORDER_START ||
      type === actionTypes.UPDATE_ORDER_START ||
      type === actionTypes.DELETE_ORDER_START ||
      type === actionTypes.FETCH_ORDERS_START:
      return on_action_start(state, action);
    case type === actionTypes.ADD_ORDER_FAIL ||
      type === actionTypes.UPDATE_ORDER_FAIL ||
      type === actionTypes.DELETE_ORDER_FAIL ||
      type === actionTypes.FETCH_ORDERS_FAIL:
      return on_action_fail(state, action);
    case type === actionTypes.ADD_ORDER_SUCCESS:
      return add_order_success(state, action);
    case type === actionTypes.UPDATE_ORDER_SUCCESS:
      return update_order_success(state, action);
    case type === actionTypes.DELETE_ORDER_SUCCESS:
      return delete_order_success(state, action);
    case type === actionTypes.FETCH_ORDERS_SUCCESS:
      return fetch_orders_success(state, action);
    case type === actionTypes.RESET_ORDER_INFO:
      return reset_order_info(state);
    case type === actionTypes.INCREMENT_PAGE:
      return increment_page(state);
    case type === actionTypes.DECREMENT_PAGE:
      return decrement_page(state);
    default:
      return state;
  }
};

export default reducer;
