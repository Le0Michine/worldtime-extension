import { useCallback, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { TimeLine, Clock } from "../../app.common/components/index.js";
import { AddNewTimeline } from "./AddNewTimeline.js";
import { TimeLineControls } from "./TimeLineControls.js";
import { DisplaySettings } from "./DisplaySettings.js";
import {
  TimeZoneInfo,
  getOffset,
  getHoursWithOffset,
} from "../../app.common/models/index.js";
import { RootState } from "../../app.common/store.js";
import { getManifest } from "../../app.common/util/manifest.js";

import style from "./OptionsLayout.module.scss";
import {
  deleteTimeline,
  replaceTimelines,
} from "../../app.common/reducers/TimeLineReducer.js";
import { init } from "../../app.common/reducers/EditTimeLineFormReducer.js";
import { ButtonGroup } from "@mui/material";

export const OptionsLayout = () => {
  const dispatch = useDispatch();
  const [mouseOverTimeLineIndex, setMouseOverTimeLineIndex] = useState(-1);
  const [manifestData, setManifestData] = useState(getManifest());

  const timeLines = useSelector(
    (state: RootState) => state.timeLines.timelines,
  );
  const displaySettings = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const scrollPosition = useSelector(
    (state: RootState) => state.scrollPosition,
  );

  const onStartEditTimeline = useCallback(
    (tl: TimeZoneInfo) => {
      dispatch(init(tl));
    },
    [dispatch],
  );

  const onDeleteTimeLine = useCallback(
    (tl: TimeZoneInfo) => {
      dispatch(deleteTimeline(tl.timeLineId));
    },
    [dispatch],
  );

  const swapTimeLines = useCallback(
    (i: number, j: number) => {
      const newList = [...timeLines];
      newList[i] = timeLines[j];
      newList[j] = timeLines[i];
      dispatch(replaceTimelines(newList));
    },
    [dispatch, timeLines],
  );

  const onMouseEnter = useCallback(
    (i: number) => setMouseOverTimeLineIndex(i),
    [setMouseOverTimeLineIndex],
  );
  const onMouseLeave = useCallback(
    () => setMouseOverTimeLineIndex(-1),
    [setMouseOverTimeLineIndex],
  );
  const sectionSpacing = "mt-5";

  return (
    <Card className="m-3">
      <div className="p-3">
        <div className={style.header}>
          <span className={style.clock}>
            <Clock use24HoursFormat={displaySettings.use24HoursTime} />
          </span>
        </div>
        <Divider />
        <Typography variant="body2" className="mt-2">
          Display settings
        </Typography>
        <div>
          <DisplaySettings />
        </div>
        <Typography variant="body2" className={sectionSpacing}>
          Selected timelines
        </Typography>
        <div id="timeLinesContainer">
          {timeLines.map((tl, index) => (
            <div
              key={tl.timeLineId}
              className={style.timeLineContainer}
              onMouseEnter={() => onMouseEnter(index)}
              onMouseLeave={() => onMouseLeave()}
            >
              <TimeLine
                timeLine={tl}
                scrollPosition={scrollPosition.position}
                offset={getOffset(tl)}
                hourDayList={getHoursWithOffset(getOffset(tl))}
                displaySettings={displaySettings}
              />
              <div className={style.timLineControlsContainer}>
                <TimeLineControls
                  onEdit={() => onStartEditTimeline(tl)}
                  onDelete={() => onDeleteTimeLine(tl)}
                  onUp={() => swapTimeLines(index, index - 1)}
                  onDown={() => swapTimeLines(index, index + 1)}
                  upDisabled={!index}
                  downDisabled={index === timeLines.length - 1}
                  show={index === mouseOverTimeLineIndex}
                />
              </div>
            </div>
          ))}
        </div>
        <Typography variant="body2" className={sectionSpacing}>
          Add a new timeline
        </Typography>
        <AddNewTimeline />
        <ButtonGroup>
          <Button
            color="primary"
            onClick={() => {
              localStorage.clear();
              location.reload();
            }}
          >
            Reset to default
          </Button>
        </ButtonGroup>
        <div className="align-items-center d-flex">
          <Typography variant="body2" className="ml-auto">
            v{manifestData.version}
          </Typography>
          <Typography variant="body2" className="mx-1">
            |
          </Typography>
          <Typography variant="body2" className="">
            db{(moment.tz as any).dataVersion}
          </Typography>
        </div>
      </div>
    </Card>
  );
};
