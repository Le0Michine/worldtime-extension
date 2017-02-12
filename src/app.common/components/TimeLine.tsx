import * as React from "react";
import * as moment from "moment";
const style = require("./TimeLine.css");

import { TimeZoneInfo, getOffset } from "../models";

interface TimeLineProps {
  timeLine: TimeZoneInfo;
  offset: number;
  hours: number[];
}

interface TimeLineState {
  time: string;
}

export class TimeLine extends React.Component<TimeLineProps, TimeLineState> {
  private interval: any;

  constructor(props) {
    super(props);
    this.state = {
      time: this.getCurrentTime(getOffset(this.props.timeLine))
    };
    this.interval = setInterval(() => this.setState({ time: this.getCurrentTime(getOffset(this.props.timeLine)) }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCurrentTime(offset: number) {
    return moment().utcOffset(offset).format("HH:mm");
  }

  isDST(offset: number) {
    return moment().utcOffset(offset).isDST();
  }

  renderHourCell(h, i, currentHour) {
    const styles = [style.hour];
    if (h === currentHour) {
      styles.push(style.currentHour);
    }
    if (h === 0) {
      styles.push(style.hourMidnight);
    }
    if (i === 0 ) {
      styles.push(style.timeLineBorderLeft);
    }
    if (i === 23 ) {
      styles.push(style.timeLineBorderRight);
    }
    if (h < 8 || h > 21) {
      styles.push(style.nightHour);
    }
    return (<span className={styles.join(" ")} key={h}>{h}</span>);
  }

  renderTimeLine(hours, offset) {
    const currentHour = +moment().utcOffset(offset).format("HH");
    return (
      <div className={style.timeLine}>
        {hours.map((h, i) => this.renderHourCell(h, i, currentHour))}
      </div>);
  }

  render() {
    const { offset, hours } = this.props;
    // const offset = getOffset(this.props.timeLine);
    // const hours = getHoursWithOffset(offset);
    return (
      <div className={style.container}>
        <div className="clearfix">
          <div className="pull-left">{this.props.timeLine.name}</div>
          <div className={`pull-left ${style.timeLineInfo}`}>{this.props.timeLine.timeZoneId.replace("_", " ")}</div>
          <div className={`pull-left ${style.timeLineInfo}`}>{`UTC${offset >= 0 ? "+" : ""}${offset / 60}`}</div>
          <div className={`pull-left ${style.timeLineInfo}`}>{`${this.isDST(offset) ? "DST " : ""}`}</div>
          <div className="pull-right">{this.state.time}</div>
        </div>
        <div>
          {this.renderTimeLine(hours, offset)}
        </div>
      </div>
    );
  }
}