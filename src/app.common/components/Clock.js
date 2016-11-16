import React from "react";
import style from "./Clock.css";

export class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      time: this.getTimeString(Date.now()),
    };
    setInterval(() => this.updateTime(Date.now()), 1000);
  }

  updateTime(unixTime) {
    const time = this.getTimeString(unixTime);
    this.setState({time});
  }

  getTimeString(unixTime) {
    const date = new Date(unixTime);
    return date.toLocaleTimeString();
  }

  render() {
    return (
      <div className={style.clock}>{this.state.time}</div>
    );
  }
}