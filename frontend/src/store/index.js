import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  watchUsers,
  watchCategories,
  watchProducts,
  watchOrders,
  watchOrdersDetails,
} from './sagas';
import usersReducer from './reducers/users';
import categoryReducer from './reducers/category';
import productReducer from './reducers/product';
import orderBuilderReducer from './reducers/order_builder';
import ordersDetails from './reducers/orders_details';
import { USER_LOGOUT } from './actions/actionTypes';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const appReducer = combineReducers({
  users: usersReducer,
  category: categoryReducer,
  product: productReducer,
  order_builder: orderBuilderReducer,
  orders_details: ordersDetails,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined;
  }
  return appReducer(state, action);
};

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleWare)));

sagaMiddleWare.run(watchUsers);
sagaMiddleWare.run(watchCategories);
sagaMiddleWare.run(watchProducts);
sagaMiddleWare.run(watchOrders);
sagaMiddleWare.run(watchOrdersDetails);

export default store;
