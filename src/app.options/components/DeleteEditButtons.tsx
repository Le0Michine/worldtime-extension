import * as React from "react";

const style = require("./DeleteEditButtons.css");

export class DeleteEditButtons extends React.Component<any, any> {
  static propTypes = {
    onEdit: React.PropTypes.func.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onUp: React.PropTypes.func.isRequired,
    onDown: React.PropTypes.func.isRequired,
    downDisabled: React.PropTypes.bool,
    upDisabled: React.PropTypes.bool
  };

  render() {
    const { router, timeLines, upDisabled, downDisabled } = this.props;
    return (
      <div className={`btn-group`}>
        <button onClick={this.props.onEdit} className={`btn btn-default`}>edit</button>
        <button onClick={this.props.onDelete} className={`btn btn-default`}>delete</button>
        <button onClick={this.props.onUp} className={`btn btn-default ${upDisabled ? "disabled" : ""}`}>up</button>
        <button onClick={this.props.onDown} className={`btn btn-default ${downDisabled ? "disabled" : ""}`}>down</button>
      </div>
    );
  }
}