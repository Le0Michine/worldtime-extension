import * as React from "react";
import IconButton from "material-ui/IconButton";
import ModeEditIcon from 'material-ui-icons/ModeEdit';
import DeleteForeverIcon from 'material-ui-icons/DeleteForever';
import KeyboardArrowUpIcon from 'material-ui-icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from 'material-ui-icons/KeyboardArrowDown';

import * as style from "./TimeLineControls.scss";

export class TimeLineControls extends React.Component<any, any> {
  render() {
    const { router, timeLines, upDisabled, downDisabled, show } = this.props;
    return (
      <div className={`btn-group ${!show ? "btn-group-hidden" : ""}`}>
        <IconButton className={style.iconButtonSmall} onClick={this.props.onEdit} aria-label="edit">
          <ModeEditIcon />
        </IconButton>
        <IconButton className={style.iconButtonSmall} onClick={this.props.onDelete} aria-label="delete">
          <DeleteForeverIcon />
        </IconButton>
        <IconButton className={style.iconButtonSmall} onClick={this.props.onUp} aria-label="up">
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton className={style.iconButtonSmall} onClick={this.props.onDown} aria-label="down">
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
    );
  }
}