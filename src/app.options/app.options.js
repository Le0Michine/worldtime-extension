import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import { store } from "../app.common/store";
import OptionsLayout from "./components/OptionsLayout";
import AddTimelineFromList from "./components/AddTimelineFromList";
import AddTimelineManually from "./components/AddTimelineManually";

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={OptionsLayout}>
        <IndexRoute component={AddTimelineManually}></IndexRoute>
        <Route path="timelines" component={AddTimelineFromList}></Route>
      </Route>
    </Router>
  </Provider>
, app);