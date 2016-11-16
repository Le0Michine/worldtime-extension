import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import { store } from "../app.common/store";
import OptionsLayout from "./components/OptionsLayout";
import AddTimelineFromList from "./components/AddTimelineFromList";
import EditTimeLine from "./components/EditTimeLine";

const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={OptionsLayout}>
        <IndexRoute component={EditTimeLine}></IndexRoute>
        <Route path="timelines" component={AddTimelineFromList}></Route>
      </Route>
    </Router>
  </Provider>
, app);