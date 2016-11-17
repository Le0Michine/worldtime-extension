import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm, initialize } from 'redux-form';

import { select } from "../../app.common/actions";
import style from "./EditTimeLine.css";

@connect(
  store => ({
    initialValues: { timeZoneOffset: 0 }
  }),
  {
    fillForm: initialize,
    select
  }
)
@reduxForm({
  form: "editTimeLineForm"
})
export default class EditTimeLine extends React.Component {
  resetForm() {
    let id = this.props.values ? this.props.values.id : 0;
    let timeLine = Object.assign({}, { id, name: "", timeZoneName: "", timeZoneOffset: "" });
    this.props.select(timeLine.id);
    this.props.fillForm("editTimeLineForm", timeLine, false);
  }

  render() {
    const { handleSubmit, values } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit} className={"form-horizontal " + style.topBuffer}>
          <div className="form-group">
            <label htmlFor="name" className="control-label col-md-3">Time line name</label>
            <div className="col-md-6">
              <Field name="name" type="text" component="input" className="form-control" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="timeZoneName" className="control-label col-md-3">Time zone name</label>
            <div className="col-md-6">
              <Field name="timeZoneName" type="text" component="input" className="form-control" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="timeZoneOffset" className="control-label col-md-3">Time zone offset (UTC)</label>
            <div className="col-md-6">
              <Field name="timeZoneOffset" type="number" component="input" className="form-control" required />
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-2 col-md-offset-3">
              <button type="submit" className="btn btn-default">Save</button>
              <button type="button" onClick={this.resetForm.bind(this)} className={style.leftBuffer + " btn btn-default"}>Clear</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}