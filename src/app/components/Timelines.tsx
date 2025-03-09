import { useSelector } from "react-redux";

import { TimeLine, TimeSelector } from "../../app.common/components/index.js";
import {
  getHoursWithOffset,
  getOffset,
  RangeValue,
} from "../../app.common/models/index.js";
import { RootState } from "../../app.common/store.js";

import style from "./Layout.module.scss";

export interface TimelinesProps {
  rangeValue: RangeValue;
  rangeColor: string;
}

export const Timelines = ({ rangeColor, rangeValue }: TimelinesProps) => {
  const displaySettings = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const timeLines = useSelector(
    (state: RootState) => state.timeLines.timelines,
  );
  const scrollPosition = useSelector(
    (state: RootState) => state.scrollPosition,
  );
  const { valueMin, valueMax, rangeSize } = rangeValue;
  return (
    <div className={`${style.app} mx-auto`} id="timeLinesContainer">
      <TimeSelector
        valueMin={valueMin}
        valueMax={valueMax}
        rangeSize={rangeSize}
        color={rangeColor}
      />
      <div>
        {timeLines.map((tl) => (
          <TimeLine
            key={tl.name}
            scrollPosition={scrollPosition.position}
            timeLine={tl}
            offset={getOffset(tl)}
            hourDayList={getHoursWithOffset(getOffset(tl))}
            displaySettings={displaySettings}
          />
        ))}
      </div>
    </div>
  );
};
