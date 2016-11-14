import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';

@reduxForm({
  form: "newTimeLineForm"
})
export default class AddTimelineManually extends React.Component {
  render() {
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