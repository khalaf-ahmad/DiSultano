import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watchUsers, watchCategories, watchProducts } from "./store/sagas";
import usersReducer from './store/reducers/users';
import categoryReducer from './store/reducers/category';
import productReducer from './store/reducers/product';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  users: usersReducer,
  category: categoryReducer,
  product: productReducer
});

const sagaMiddleWare = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleWare)) )

sagaMiddleWare.run(watchUsers);
sagaMiddleWare.run(watchCategories);
sagaMiddleWare.run(watchProducts);

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
ReactDOM.render(app, document.getElementById("root"));
