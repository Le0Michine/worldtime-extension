import moment from "moment";
import React, { useEffect, useState } from "react";

import {
  DisplaySettingsInfo,
  getOffset,
  TimeZoneInfo,
  HourDay,
} from "../models/index.js";
import {
  formatTime,
  formatOffset,
  getTimeZoneAbbreviation,
} from "../util/time.js";
import { HourCellList } from "./HourCellList.js";
import { HourNoteList } from "./HourNoteList.js";
import style from "./TimeLine.module.scss";
import Typography from "@mui/material/Typography";

interface TimeLineProps {
  timeLine: TimeZoneInfo;
  offset: number;
  hourDayList: HourDay[];
  displaySettings: DisplaySettingsInfo;
  scrollPosition: number;
}

const isDST = (tz: string) => {
  return moment().tz(tz).isDST();
};

const getTimeLineOffsetY = (utcOffset: number, scrollPosition: number) => {
  const uiOffset = (utcOffset % 60) / 60;
  const oneDay = 100 / 3;
  const oneHour = oneDay / 24;
  const position = scrollPosition;
  return -oneDay + oneHour * position - oneHour * uiOffset;
};

const getCurrentTime = (offset: number, use24HoursTime: boolean) => {
  return formatTime(moment().utcOffset(offset), use24HoursTime);
};

export const TimeLine = ({
  scrollPosition,
  offset,
  hourDayList,
  displaySettings,
  timeLine,
}: TimeLineProps) => {
  const [time, setTime] = useState(
    getCurrentTime(getOffset(timeLine), displaySettings.use24HoursTime),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        getCurrentTime(getOffset(timeLine), displaySettings.use24HoursTime),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [setTime]);

  const summer = displaySettings.showDST === "DST" ? "DST" : "Summer time";
  const winter = displaySettings.showDST === "DST" ? "" : "Winter time";
  const abbreviation = getTimeZoneAbbreviation(timeLine.timeZoneId);

  return (
    <div className={style.container}>
      <div className="d-flex">
        <Typography component="h3" variant="subtitle1" className="mr-2">
          {timeLine.name}
        </Typography>
        {displaySettings.showTimeZoneId ? (
          <Typography component="h3" variant="subtitle1" color="secondary" className="mr-2">
            {timeLine.timeZoneId.replace("_", " ")}
          </Typography>
        ) : null}
        {displaySettings.showTimeZoneAbbreviation && Boolean(abbreviation) ? (
          <Typography component="h3" variant="subtitle1" color="secondary" className="mr-2">
            {abbreviation}
          </Typography>
        ) : null}
        {displaySettings.showUTCOffset ? (
          <Typography component="h3" variant="subtitle1" color="secondary" className="mr-2">
            UTC{formatOffset(offset)}
          </Typography>
        ) : null}
        {displaySettings.showDST !== "hide" ? (
          <Typography component="h3" variant="subtitle1" color="secondary">
            {isDST(timeLine.timeZoneId) ? summer : winter}
          </Typography>
        ) : null}
        <Typography component="h3" variant="subtitle1" className="ml-auto">
          {time}
        </Typography>
      </div>
      <div>
        <HourCellList
          hours={hourDayList.map((x) => x.hour)}
          utcOffset={offset}
          scrollOffset={getTimeLineOffsetY(offset, scrollPosition)}
          use24HoursTime={displaySettings.use24HoursTime}
        />
      </div>
      <div className={style.timeLineNotes}>
        {displaySettings.showDateLabels ? (
          <HourNoteList
            hourDayList={hourDayList}
            scrollOffset={getTimeLineOffsetY(offset, scrollPosition)}
          />
        ) : null}
      </div>
    </div>
  );
};
