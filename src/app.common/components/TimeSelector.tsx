import * as React from "react";
import * as moment from "moment";
const style = require("./TimeSelector.css");

import { TimeZoneInfo, TimeSpanInfo } from "../models";

interface TimeSelectorProps {
  valueMin: number;
  valueMax: number;
  rangeSize: number;
  color: string;
}

export class TimeSelector extends React.Component<TimeSelectorProps, any> {
  render() {
    const { valueMin, valueMax, rangeSize, color } = this.props;
    const left = valueMin / rangeSize * 100;
    const right = valueMax / rangeSize * 100;
    const visibilityLeft = left <= 0.001 ? "hidden" : "visible";
    const visibilityRight = right >= 99.999 ? "hidden" : "visible";
    return (
      <div>
        <div className={style.timeSelector} style={{ left: `${left}%`, visibility: visibilityLeft, borderColor: color }}></div>
        <div className={style.timeSelector} style={{ left: `${right}%`, visibility: visibilityRight, borderColor: color }}></div>
      </div>
    );
  }
}
