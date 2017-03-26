import * as React from "react";
import * as moment from "moment";
const style = require("./TimeLine.css");

import { TimeZoneInfo, getOffset, DisplaySettingsInfo } from "../models";

interface TimeLineProps {
  timeLine: TimeZoneInfo;
  offset: number;
  hours: number[];
  displaySettings: DisplaySettingsInfo;
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

  isDST(tz: string) {
    return moment().tz(tz).isDST();
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
    const { offset, hours, displaySettings, timeLine } = this.props;
    const summer = displaySettings.showDST === "DST" ? "DST" : "Summer";
    const winter = displaySettings.showDST === "DST" ? "" : "Winter";

    return (
      <div className={style.container}>
        <div className="clearfix">
          <div className="pull-left">{timeLine.name}</div>
          {displaySettings.showTimeZoneId ?
            <div className={`pull-left ${style.timeLineInfo}`}>{this.props.timeLine.timeZoneId.replace("_", " ")}</div> : null
          }
          {displaySettings.showUTCOffset ?
            <div className={`pull-left ${style.timeLineInfo}`}>{`UTC${offset >= 0 ? "+" : ""}${offset / 60}`}</div> : null
          }
          {displaySettings.showDST !== "hide" ?
            <div className={`pull-left ${style.timeLineInfo}`}>{`${this.isDST(timeLine.timeZoneId) ?  summer : winter}`}</div> : null
          }
          <div className="pull-right">{this.state.time}</div>
        </div>
        <div>
          {this.renderTimeLine(hours, offset)}
        </div>
      </div>
    );
  }
}