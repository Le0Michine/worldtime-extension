import React from "react";
import IconButton from "@mui/material/IconButton";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import * as style from "./TimeLineControls.module.scss";

export class TimeLineControls extends React.Component<any, any> {
  render() {
    const { router, timeLines, upDisabled, downDisabled, show } = this.props;
    return (
      <div className={`btn-group ${!show ? "btn-group-hidden" : ""}`}>
        <IconButton
          className={style.iconButtonSmall}
          onClick={this.props.onEdit}
          aria-label="edit"
        >
          <ModeEditIcon />
        </IconButton>
        <IconButton
          className={style.iconButtonSmall}
          onClick={this.props.onDelete}
          aria-label="delete"
        >
          <DeleteForeverIcon />
        </IconButton>
        <IconButton
          className={style.iconButtonSmall}
          disabled={upDisabled}
          onClick={this.props.onUp}
          aria-label="up"
        >
          <KeyboardArrowUpIcon />
        </IconButton>
        <IconButton
          className={style.iconButtonSmall}
          disabled={downDisabled}
          onClick={this.props.onDown}
          aria-label="down"
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </div>
    );
  }
}
