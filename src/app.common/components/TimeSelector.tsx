import * as React from "react";
import * as moment from "moment";
const style = require("./TimeSelector.css");

import { TimeZoneInfo } from "../models";

export class TimeSelector extends React.Component<any, any> {
  render() {
    const { show, left } = this.props;
    const { width, height } = { width: "20px", height: "50px" };
    const visibility = show ? "show" : "hidden"
    return (
      <div className={style.timeSelector} style={{ width, visibility, transform: `translateX($left)` }}></div>
    );
  }
}