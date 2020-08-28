import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { watchUsers, watchCategories, watchProducts, watchOrders } from './sagas';
import usersReducer from "./reducers/users";
import categoryReducer from "./reducers/category";
import productReducer from "./reducers/product";
import orderBuilderReducer from './reducers/order_builder';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;

const rootReducer = combineReducers({
    users: usersReducer,
    category: categoryReducer,
    product: productReducer,
    order_builder: orderBuilderReducer
});

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleWare))
);

sagaMiddleWare.run(watchUsers);
sagaMiddleWare.run(watchCategories);
sagaMiddleWare.run(watchProducts);
sagaMiddleWare.run(watchOrders);

export default store;