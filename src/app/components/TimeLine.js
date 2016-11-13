import React from "react";
import style from "./TimeLine.css";

export default class TimeLine extends React.Component {
  getTime() {
    const currentTime = new Date(Date.now());
    var h = this.getCurrentHour();
    var m = currentTime.getMinutes();
    return (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
  }

  getCurrentHour() {
    const currentTime = new Date(Date.now());
    var h = currentTime.getHours();
    h = h + this.props.timeLine.relativeTimeZoneOffset;
    h = h < 0 ? h + 24 : h >= 24 ? h - 24 : h;
    return h;
  }

  renderHourCell(h, i) {
    var styles = [style.hour];
    if (h === this.getCurrentHour()) {
      styles.push(style.currentHour);
    }
    if (h === 0 || i === 0 ) {
      styles.push(style.timeLineBorderLeft);
    }
    if (h === 23 || i === 23 ) {
      styles.push(style.timeLineBorderRight);
    }
    if (h < 8 || h > 21) {
      styles.push(style.nightHour);
    }
    return (<span className={styles.join(" ")} key={h}>{h}</span>);
  }

  renderTimeLine(hours) {
    return (
      <div className={style.timeLine}>
        {hours.map((h, i) => this.renderHourCell(h, i))}
      </div>);
  }

  render() {
    return (
      <div className={style.container}>
        <div class="clearfix">
          <div class="pull-left">{this.props.timeLine.name}</div>
          <div class="pull-right">{this.getTime()}</div>
        </div>
        <div>
          {this.renderTimeLine(this.props.timeLine.hours)}
        </div>
      </div>
    );
  }
}