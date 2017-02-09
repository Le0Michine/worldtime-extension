import * as React from "react";
import { connect, ActionCreator } from "react-redux";
import { Field, reduxForm, initialize } from 'redux-form';

import { selectTimeLine, createOrUpdateTimeLine, clearForm } from "../../app.common/actions";
const style = require("./EditTimeLine.css");

interface EditTimeLineStateProps {
  initialValues: any;
  values?: any;
  handleSubmit?: any;
}

interface EditTimeLineDispatchProps {
  clearForm: ActionCreator<any>;
  selectTimeLine: ActionCreator<any>;
  updateOrCreate: ActionCreator<any>,
}

type EditTimeLineProps = EditTimeLineStateProps & EditTimeLineDispatchProps;

@connect<EditTimeLineStateProps, EditTimeLineDispatchProps, EditTimeLineProps>(
  store => ({
    initialValues: { timeZoneOffset: 0 }
  }),
  {
    updateOrCreate: createOrUpdateTimeLine as ActionCreator<any>,
    clearForm: clearForm as ActionCreator<any>,
    selectTimeLine: selectTimeLine as ActionCreator<any>
  }
)
@reduxForm({
  form: "editTimeLineForm"
})
export default class EditTimeLine extends React.Component<EditTimeLineProps, React.ComponentState> {
  render() {
    const { values, handleSubmit } = this.props;
    const id = values ? values.id : 0;
    return (
      <div>
        {/*<form onSubmit={this.props.updateOrCreate} className={"form-horizontal " + style.topBuffer}>*/}
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
            <div className="col-md-9 col-md-offset-3">
              <button type="submit" className="btn btn-default">Save</button>
              <button type="button" onClick={() => { this.props.selectTimeLine(id); this.props.clearForm(id); }} className={style.leftBuffer + " btn btn-default"}>Clear</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}