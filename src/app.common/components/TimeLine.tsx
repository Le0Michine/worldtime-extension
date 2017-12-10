import { formatTime } from "../util/time";
import * as React from "react";
import * as moment from "moment";
import Typography from "material-ui/Typography";
import { withTheme, Theme } from "material-ui/styles";
const style = require("./TimeLine.css");

import { TimeZoneInfo, getOffset, DisplaySettingsInfo, ScrollPosition } from "../models";

interface TimeLineProps {
  timeLine: TimeZoneInfo;
  offset: number;
  hours: number[];
  displaySettings: DisplaySettingsInfo;
  theme: Theme;
  scrollPosition: number;
}

interface TimeLineState {
  time: string;
}

class TimeLineImpl extends React.Component<TimeLineProps, TimeLineState> {
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
    const use24HoursFormat = this.props.displaySettings.use24HoursTime;
    return formatTime(moment().utcOffset(offset), use24HoursFormat);
  }

  isDST(tz: string) {
    return moment().tz(tz).isDST();
  }

  renderHourCell(h: number, i: number, currentHour: number) {
    const classes = [style.hour];
    const { theme } = this.props;
    let background = theme.palette.primary[50];
    if (i === 0) {
      // classes.push(style.timeLineBorderLeft);
    }
    if (i === 23) {
      // classes.push(style.timeLineBorderRight);
    }
    if (h < 8 || h > 21) {
      background = theme.palette.primary[100];
    }
    if (h === 0) {
      background = theme.palette.primary[200];
    }
    if (h === currentHour) {
      background = theme.palette.primary[700];
    }
    const color = theme.palette.getContrastText(background);
    const styles: React.CSSProperties = Object.assign({}, theme.typography.subheading, {
      background,
      color,
      borderBottom: theme.palette.grey.A400
    } as React.CSSProperties);
    const use24HoursFormat = this.props.displaySettings.use24HoursTime;
    let displayHour = String(h);
    if (!use24HoursFormat) {
      switch (h) {
        case 0:
          displayHour = "am";
          break;
        case 12:
          displayHour = "pm";
          break;
        default:
          displayHour = String(h % 12 + 1);
          break;
      }
    }
    return (<span className={classes.join(" ")} style={styles} key={`${h}_${i}`}>{displayHour}</span>);
  }

  renderTimeLine(hours, offset) {
    const currentHour = +moment().utcOffset(offset).format("HH");
    const uiOffset = (offset % 60) / 60;
    const oneDay = 100 / 3;
    const oneHour = oneDay / 24;
    const position = this.props.scrollPosition;
    const inlineStyle = {
      transform: `translateX(${-oneDay + oneHour * position - oneHour * uiOffset}%)`
    };
    return (
      <div className={style.timeLine} style={inlineStyle}>
        {[...hours, ...hours, ...hours].map((h, i) => this.renderHourCell(h, i, currentHour))}
      </div>);
  }

  render() {
    const { offset, hours, displaySettings, timeLine } = this.props;
    const summer = displaySettings.showDST === "DST" ? "DST" : "Summer";
    const winter = displaySettings.showDST === "DST" ? "" : "Winter";

    return (
      <div className={style.container}>
        <div className="d-flex">
          <Typography type="subheading" className="mr-2">{timeLine.name}</Typography>
          {displaySettings.showTimeZoneId ?
            <Typography type="subheading" color="secondary" className="mr-2">{timeLine.timeZoneId.replace("_", " ")}</Typography> : null
          }
          {displaySettings.showUTCOffset ?
            <Typography type="subheading" color="secondary" className="mr-2">UTC{offset >= 0 ? "+" : ""}{offset / 60}</Typography> : null
          }
          {displaySettings.showDST !== "hide" ?
            <Typography type="subheading" color="secondary">{this.isDST(timeLine.timeZoneId) ? summer : winter}</Typography> : null
          }
          <Typography type="subheading" className="ml-auto">{this.state.time}</Typography>
        </div>
        <div>
          {this.renderTimeLine(hours, offset)}
        </div>
      </div>
    );
  }
}

export const TimeLine = withTheme<Partial<TimeLineProps>>()(TimeLineImpl);
