import * as React from "react";

const style = require("./DeleteEditButtons.css");

export class DeleteEditButtons extends React.Component<any, any> {
  render() {
    const { router, timeLines } = this.props;
    return (
      <div>
        <button onClick={this.props.onEdit} className={style.btnLeft + " material-icons1 btn btn-default"}>edit</button>
        <button onClick={this.props.onDelete} className={style.btnRight + " material-icons1 btn btn-default"}>delete</button>
      </div>
    );
  }
}