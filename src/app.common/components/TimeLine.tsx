import * as React from "react";
import * as moment from "moment";
const style = require("./TimeLine.css");

import { TimeZoneInfo, getOffset, getHoursWithOffset } from "../models";

export class TimeLine extends React.Component<TimeLineProps, any> {
  interval: any;

  constructor(props) {
    super(props);
    const offset = getOffset(this.props.timeLine);
    const hours = getHoursWithOffset(offset);
    this.state = {
      time: this.getCurrentTime(offset),
      offset,
      hours
    };
    this.interval = setInterval(() => this.setState({ time: this.getCurrentTime(offset) }), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getCurrentTime(offset: number) {
    return moment().utcOffset(offset).format("HH:mm");
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

  renderTimeLine(hours) {
    const currentHour = +moment().utcOffset(this.state.offset).format("HH");
    return (
      <div className={style.timeLine}>
        {hours.map((h, i) => this.renderHourCell(h, i, currentHour))}
      </div>);
  }

  render() {
    // const time = moment().utcOffset(this.props.timeLine.timeZoneOffset).format("HH:mm");
    return (
      <div className={style.container}>
        <div className="clearfix">
          <div className="pull-left">{this.props.timeLine.name}</div>
          <div className="pull-right">{this.state.time}</div>
        </div>
        <div>
          {this.renderTimeLine(this.state.hours)}
        </div>
      </div>
    );
  }
}

interface TimeLineProps {
  timeLine: TimeZoneInfo;
}