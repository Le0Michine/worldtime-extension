import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

import TimeLine from "../../app/components/TimeLine";
import { TimeZoneInfo } from "../models";
import style from "./AddTimeLine.css";
import { TimeLineInfo } from "../models";
import * as addTimeLine from "../actions/AddNewTimeLineActions";
import * as timeLines from "../actions/TimeLineActions";

@reduxForm({
  form: "newTimeLineForm"
})
export default class AddTimelineManually extends React.Component {
  render() {
    console.log("props", this.props);
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Time line name</label>
            <Field name="name" type="text" component="input" />
          </div>
          <div>
            <label htmlFor="timeZoneName">Time zone name</label>
            <Field name="timeZoneName" type="text" component="input" />
          </div>
          <div>
            <label htmlFor="timeZoneOffset">Time zone offset</label>
            <Field name="timeZoneOffset" type="number" component="input" />
          </div>
          <button>Save</button>
        </form>
      </div>
    );
  }
}