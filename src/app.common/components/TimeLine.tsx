import { Theme, withTheme } from "material-ui/styles";
import Typography from "material-ui/Typography";
import * as moment from "moment";
import * as React from "react";

import { DisplaySettingsInfo, getOffset, TimeZoneInfo } from "../models";
import { formatTime, fromatOffset, getTimeZoneAbbreviation } from "../util/time";
import { HourCellList } from "./HourCellList";
import { HourNoteList } from "./HourNoteList";
import * as style from "./TimeLine.scss";

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

  getTimeLineOffsetY(utcOffset: number) {
    const uiOffset = (utcOffset % 60) / 60;
    const oneDay = 100 / 3;
    const oneHour = oneDay / 24;
    const position = this.props.scrollPosition;
    return -oneDay + oneHour * position - oneHour * uiOffset;
  }

  render() {
    const { offset, hours, displaySettings, timeLine } = this.props;
    const summer = displaySettings.showDST === "DST" ? "DST" : "Summer time";
    const winter = displaySettings.showDST === "DST" ? "" : "Winter time";
    const abbreviation = getTimeZoneAbbreviation(timeLine.timeZoneId);

    return (
      <div className={style.container}>
        <div className="d-flex">
          <Typography type="subheading" className="mr-2">{timeLine.name}</Typography>
          {displaySettings.showTimeZoneId ?
            <Typography type="subheading" color="secondary" className="mr-2">{timeLine.timeZoneId.replace("_", " ")}</Typography> : null
          }
          {displaySettings.showTimeZoneAbbreviation && Boolean(abbreviation) ?
            <Typography type="subheading" color="secondary" className="mr-2">{abbreviation}</Typography> : null
          }
          {displaySettings.showUTCOffset ?
            <Typography type="subheading" color="secondary" className="mr-2">UTC{fromatOffset(offset)}</Typography> : null
          }
          {displaySettings.showDST !== "hide" ?
            <Typography type="subheading" color="secondary">{this.isDST(timeLine.timeZoneId) ? summer : winter}</Typography> : null
          }
          <Typography type="subheading" className="ml-auto">{this.state.time}</Typography>
        </div>
        <div>
          <HourCellList
            hours={hours}
            utcOffset={offset}
            scrollOffset={this.getTimeLineOffsetY(offset)}
            use24HoursTime={displaySettings.use24HoursTime}
          />
        </div>
        <div className={style.timeLineNotes}>
          {displaySettings.showDateLabels
            ? <HourNoteList
                hours={hours}
                utcOffset={offset}
                scrollOffset={this.getTimeLineOffsetY(offset)}
              />
            : null
          }
        </div>
      </div>
    );
  }
}

export const TimeLine = withTheme<Partial<TimeLineProps>>()(TimeLineImpl);
