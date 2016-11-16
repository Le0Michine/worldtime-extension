import React from "react";

import style from "./DeleteEditButtons.css";

export default class OptionsLayout extends React.Component {
  render() {
    const { router, timeLines } = this.props;
    return (
      <div>
        <button onClick={this.props.onEdit} className={style.btnLeft + " material-icons btn btn-default"}>edit</button>
        <button onClick={this.props.onDelete} className={style.btnRight + " material-icons btn btn-default"}>delete</button>
      </div>
    );
  }
}