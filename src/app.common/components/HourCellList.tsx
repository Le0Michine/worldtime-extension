import moment from "moment";

import { HourCell } from "./HourCell.js";
import style from "./TimeLine.module.scss";

interface HourCellListProps {
  hours: number[];
  scrollOffset: number;
  utcOffset: number;
  use24HoursTime: boolean;
}

export const HourCellList = ({
  scrollOffset,
  utcOffset,
  hours,
  use24HoursTime,
}: HourCellListProps) => {
  const currentHour = Number(moment().utcOffset(utcOffset).format("HH"));
  return (
    <div
      className={style.timeLine}
      style={{
        transform: `translateX(${scrollOffset}%)`,
      }}
    >
      {[...hours, ...hours, ...hours].map((h, i) => (
        <HourCell
          hour={h}
          isCurrent={h === currentHour}
          use24HoursTime={use24HoursTime}
          key={`${h}_${i}`}
        />
      ))}
    </div>
  );
};
