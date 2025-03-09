import { HourDay } from "../models/TimeZoneInfo.js";
import { formatDate } from "../util/time.js";
import { HourNote } from "./HourNote.js";
import style from "./TimeLine.module.scss";

interface HourNoteListProps {
  hourDayList: HourDay[];
  scrollOffset: number;
}

const generateNotes = (
  hourDayList: HourDay[],
  dayOffsetList: number[],
): string[] => {
  const toDayNotes = (hours: HourDay[], dayOffset: number) =>
    hours.map((x) =>
      x.hour === 0 ? formatDate(x.dayOffset + dayOffset, 0) : "",
    );
  return dayOffsetList
    .map((dayOffset) => toDayNotes(hourDayList, dayOffset))
    .reduce((acc, x) => acc.concat(x), []);
};

export const HourNoteList = ({
  scrollOffset,
  hourDayList,
}: HourNoteListProps) => {
  const dayOffsetList = [-1, 0, 1];
  return (
    <div
      className={style.timeLine}
      style={{
        transform: `translateX(${scrollOffset}%)`,
      }}
    >
      {generateNotes(hourDayList, dayOffsetList).map((text, i) => (
        <HourNote text={text} key={i} />
      ))}
    </div>
  );
};
