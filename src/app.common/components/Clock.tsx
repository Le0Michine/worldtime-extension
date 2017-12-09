import * as React from "react";
import * as moment from "moment";
import Typography from "material-ui/Typography";

export class Clock extends React.Component<{}, ClockState> {
  constructor(props: {}) {
    super(props);
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
      <Typography type="display1">{this.state.time}</Typography>
    );
  }
}

interface ClockState {
  time: string;
}