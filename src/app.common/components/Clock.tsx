import Typography from "material-ui/Typography";
import * as moment from "moment";
import * as React from "react";

import { formatTime } from "../util/time";

interface ClockProps {
  use24HoursFormat: boolean;
}

interface ClockState {
  time: string;
}

export class Clock extends React.Component<ClockProps, ClockState> {
  constructor(props: ClockProps) {
    super(props);
    this.state = {
      time: moment().format("HH:mm:ss"),
    };
    setInterval(() => this.updateTime(), 1000);
  }

  updateTime(): void {
    this.setState({time: formatTime(moment(), this.props.use24HoursFormat, true)});
  }

  render() {
    return (
      <Typography type="display1">{this.state.time}</Typography>
    );
  }
}
