import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Range } from "../../app.common/components/Range.js";
import {
  CalendarEvent,
  RangeValue,
  TimeSpanInfo,
} from "../../app.common/models/index.js";
import { RootState } from "../../app.common/store.js";
import { formatTime } from "../../app.common/util/time.js";
import style from "./Layout.module.scss";
import { changeSelectedTimespan } from "../../app.common/reducers/SelectedTimeSpanReducer.js";

interface ILayoutProps {
  timeLines?: any[];
  selectedTimeSpan?: TimeSpanInfo;
  rangeColor?: string;
  rangeValue: RangeValue;
}

export const BottomPanel = (props: ILayoutProps) => {
  const dispatch = useDispatch();
  const scrollPosition = useSelector(
    (state: RootState) => state.scrollPosition,
  );
  const displaySettings = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const timeLines = useSelector(
    (state: RootState) => state.timeLines.timelines,
  );
  const selectedTimeSpan = useSelector(
    (state: RootState) => state.selectedTimeSpan,
  );
  const updateSelectedTimeRange = useCallback(
    (detail) => {
      const { valueMin: start, valueMax: end } = detail;
      const { position } = scrollPosition;
      const { selectionStep } = displaySettings;
      const stepsInHour = 60 / selectionStep;
      const startHour = Math.floor(start / stepsInHour) - position;
      const startMinute = (start % stepsInHour) * selectionStep;
      const endHour = Math.floor(end / stepsInHour) - position;
      const endMinute = (end % stepsInHour) * selectionStep;
      dispatch(
        changeSelectedTimespan({ startHour, startMinute, endHour, endMinute }),
      );
    },
    [dispatch, scrollPosition, displaySettings],
  );

  const { rangeColor, rangeValue } = props;
  const { valueMin, valueMax, rangeSize } = rangeValue;
  const startTime = moment()
    .hours(selectedTimeSpan.startHour)
    .minutes(selectedTimeSpan.startMinute);
  const endTime = moment()
    .hours(selectedTimeSpan.endHour)
    .minutes(selectedTimeSpan.endMinute);
  if (selectedTimeSpan.endHour === 24) {
    endTime.add({ days: 1 });
  }
  const duration = moment.duration(
    (selectedTimeSpan.endHour - selectedTimeSpan.startHour) * 60 +
      (selectedTimeSpan.endMinute - selectedTimeSpan.startMinute),
    "minutes",
  );
  return (
    <div className={`${style.app} mx-auto pb-2`}>
      <div className={`${style.timeSpanSelector} mt-0`}>
        <Range
          color={rangeColor}
          rangeSize={rangeSize}
          valueMin={valueMin}
          valueMax={valueMax}
          onChange={updateSelectedTimeRange}
        />
      </div>
      {displaySettings.showControlPanel ? (
        <div className={style.timeSpanSelector}>
          <div className="bottom-panel-container">
            <div className="">
              <Typography component="h3">
                {formatTime(startTime, displaySettings.use24HoursTime)} -{" "}
                {formatTime(endTime, displaySettings.use24HoursTime)} (
                {duration.asHours().toFixed(1)}h)
              </Typography>
            </div>
            <ButtonGroup>
              <Button
                onClick={() =>
                  CalendarEvent.copyToClipboard(
                    selectedTimeSpan,
                    timeLines[0].timeZoneId,
                    timeLines,
                  )
                }
              >
                Copy
              </Button>
              <Button
                onClick={() =>
                  CalendarEvent.getGoogleCalendarLink(
                    selectedTimeSpan,
                    timeLines[0].timeZoneId,
                    timeLines,
                  )
                }
              >
                To Google Cal
              </Button>
              <Button
                onClick={() =>
                  CalendarEvent.exportToICS(
                    selectedTimeSpan,
                    timeLines[0].timeZoneId,
                    timeLines,
                  )
                }
              >
                Export to .ics
              </Button>
            </ButtonGroup>
          </div>
        </div>
      ) : null}
    </div>
  );
};
