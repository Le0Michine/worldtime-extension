import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import AppMain from "./app.main";
import { store } from "../app.common/store";

const app = document.getElementById('app');
ReactDOM.render(
  <Provider store={store}>
    <AppMain />
  </Provider>
  , app);