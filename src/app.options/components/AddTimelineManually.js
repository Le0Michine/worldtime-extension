import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

import style from "./AddTimelineManually.css";

@reduxForm({
  form: "newTimeLineForm"
})
export default class AddTimelineManually extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} className={"form-horizontal " + style.topBuffer}>
          <div className="form-group">
            <label htmlFor="name" className="control-label col-md-3">Time line name</label>
            <div className="col-md-6">
              <Field name="name" type="text" component="input" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="timeZoneName" className="control-label col-md-3">Time zone name</label>
            <div className="col-md-6">
              <Field name="timeZoneName" type="text" component="input" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="timeZoneOffset" className="control-label col-md-3">Time zone offset (UTC)</label>
            <div className="col-md-6">
              <Field name="timeZoneOffset" type="number" component="input" className="form-control" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-2 col-md-offset-3">
              <button type="submit" className="btn btn-default">Save</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}