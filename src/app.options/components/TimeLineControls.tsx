import * as React from "react";

const style = require("./TimeLineControls.css");

export class TimeLineControls extends React.Component<any, any> {
  static propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onUp: React.PropTypes.func.isRequired,
    onDown: React.PropTypes.func.isRequired,
    downDisabled: React.PropTypes.bool,
    upDisabled: React.PropTypes.bool,
    show: React.PropTypes.bool
  };

  render() {
    const { router, timeLines, upDisabled, downDisabled, show } = this.props;
    return (
      <div className={`btn-group ${!show ? "btn-group-hidden" : ""}`}>
        <button onClick={this.props.onEdit} className={`btn-icon btn-edit`}><i className="material-icons">mode_edit</i></button>
        <button onClick={this.props.onDelete} className={`btn-icon btn-delete`}><i className="material-icons">delete_forever</i></button>
        <button onClick={this.props.onUp} className={`btn-icon btn-up ${upDisabled ? "disabled" : ""}`}><i className="material-icons">keyboard_arrow_up</i></button>
        <button onClick={this.props.onDown} className={`btn-icon btn-down ${downDisabled ? "disabled" : ""}`}><i className="material-icons">keyboard_arrow_down</i></button>
      </div>
    );
  }
}