import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./state/reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));
const Application = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(Application, document.getElementById("root"));
