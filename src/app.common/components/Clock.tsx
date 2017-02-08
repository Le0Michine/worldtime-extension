import * as React from "react";
import * as moment from "moment";
const style = require("./Clock.css");

export class Clock extends React.Component<{}, ClockState> {
  constructor() {
    super();
    this.state = {
      time: moment().format("HH:mm:ss"),
    };
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime(): void {
    this.setState({time: moment().format("HH:mm:ss")});
  }

  render() {
    return (
      <div className={style.clock}>{this.state.time}</div>
    );
  }
}

interface ClockState {
  time: string;
}