import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import { store } from "../app.common/store";
import OptionsLayout from "./components/OptionsLayout";
// import AddNewTimeline from "./components/AddNewTimeline";
// import EditTimeLine from "./components/EditTimeLine";

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={OptionsLayout}></Route>
    </Router>
  </Provider>
, app);