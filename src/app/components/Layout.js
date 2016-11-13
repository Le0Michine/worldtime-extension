import React from "react";

import TimeLine from "./TimeLine";
import { TimeZoneInfo } from "../models";
import style from "./Layout.css";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      time: this.getTimeString(Date.now()),
      timeLines: this.getTimelines()
    };
    setInterval(() => this.updateTime(Date.now()), 1000);
  }

  getTimelines() {
    return [
      new TimeZoneInfo("Krakow", "CET", -1 * 60),
      new TimeZoneInfo("San Francisco", "PST", 8 * 60),
      new TimeZoneInfo("Saint Petersburg", "MSK", -3 * 60),
      new TimeZoneInfo("Yekaterinburg", "GMT+5", -5 * 60)
    ];
  }

  getTimeString(unixTime) {
    const date = new Date(unixTime);
    return date.toLocaleTimeString();
  }

  updateTime(unixTime) {
    const time = this.getTimeString(unixTime);
    this.setState({time});
  }

  render() {
    return (
      <div className={style.app}>
        <div className={style.header}>
          <div className={style.clock}>{this.state.time}</div>
          <a className={style.settingsBtn + " material-icons"} target="_blank" href="options.html">settings</a>
        </div>
        <div>
          {this.state.timeLines.map(tl => 
            <TimeLine key={tl.name} timeLine={tl} />
          )}
        </div>
      </div>
    );
  }
}