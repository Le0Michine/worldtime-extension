import React from "react";

import TimeLine from "./TimeLine";
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

  getHoursWithOffset(offset) {
    return Array(24).fill(1).map((v, i) => {
      var h = i + offset;
      if (h < 0) {
        h += 24;
      } else if (h >= 24) {
        h -= 24;
      }
      return h;
    });
  }

  getTimelines() {
    var SA = this.getHoursWithOffset(-9);
    var KRK = this.getHoursWithOffset(0);
    var SPB = this.getHoursWithOffset(2);
    var YKB = this.getHoursWithOffset(4);
    return [
      { name: "Krakow", timeZoneName: "CET", timeZoneNumber: 3, timeZoneOffset: 0, hours: KRK },
      { name: "San Fracisco", timeZoneName: "PST", timeZoneNumber: 1, timeZoneOffset: -9, hours: SA },
      { name: "Saint Petersburg", timeZoneName: "MSK", timeZoneNumber: 3, timeZoneOffset: +2, hours: SPB },
      { name: "Yekaterinburg", timeZoneName: "GMT+5", timeZoneNumber: 5, timeZoneOffset: +4, hours: YKB },
    ];
  }

  getTimeString(unixTime) {
    const date = new Date(unixTime);
    var h = date.getHours().toString();
    h = h.length > 1 ? h : "0" + h;
    var m = date.getMinutes().toString();
    m = m.length > 1 ? m : "0" + m;
    var s = date.getSeconds().toString();
    s = s.length > 1 ? s : "0" + s;
    const time = h + ":" + m + ":" + s;
    return time;
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
          <a className={style.settingsBtn + " material-icons"} target="_blank" href="">settings</a>
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