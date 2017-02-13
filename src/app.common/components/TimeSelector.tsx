import * as React from "react";
import * as moment from "moment";
const style = require("./TimeSelector.css");

import { TimeZoneInfo, TimeSpanInfo } from "../models";

interface TimeSelectorProps {
  selectedTimeSpan: TimeSpanInfo
}

export class TimeSelector extends React.Component<TimeSelectorProps, any> {
  render() {
    const { selectedTimeSpan } = this.props;
    const left = (selectedTimeSpan.startHour * 2 + selectedTimeSpan.startMinute / 30) / 48 * 100;
    const right = (selectedTimeSpan.endHour * 2 + selectedTimeSpan.endMinute / 30) / 48 * 100;
    const visibilityLeft = left <= 0.001 ? "hidden" : "visible";
    const visibilityRight = right >= 99.999 ? "hidden" : "visible";
    return (
      <div>
        <div className={style.timeSelector} style={{ left: `${left}%`, visibility: visibilityLeft }}></div>
        <div className={style.timeSelector} style={{ left: `${right}%`, visibility: visibilityRight }}></div>
      </div>
    );
  }
}