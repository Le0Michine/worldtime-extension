import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { store } from "../app.common/store";
import OptionsLayout from "./components/OptionsLayout";
import AppOptionsMain from "./app.options.main";

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <AppOptionsMain />
  </Provider>
, app);