import { Theme, withStyles } from "material-ui/styles";
import * as React from "react";

import { ClassMap, HourDay } from "../models";
import { formatDate } from "../util/time";
import { HourNote } from "./HourNote";
import * as style from "./TimeLine.scss";

interface HourNoteListProps {
  hourDayList: HourDay[];
  scrollOffset: number;
  utcOffset: number;
}

class HourNoteListImpl extends React.Component<HourNoteListProps> {

  get inlineStyle() {
    return {
      transform: `translateX(${this.props.scrollOffset}%)`
    };
  }

  generateNotes(hourDayList: HourDay[], dayOffsetList: number[], utcOffset: number): string[] {
    const toDayNotes = (hours: HourDay[], dayOffset: number) =>
      hours.map(x => x.hour === 0 ? formatDate(utcOffset, x.dayOffset + dayOffset, 0) : "");
    return dayOffsetList
      .map(dayOffset => toDayNotes(hourDayList, dayOffset))
      .reduce((acc, x) => acc.concat(x), []);
  }

  render() {
    const { hourDayList, scrollOffset, utcOffset } = this.props;
    const dateNote = [-1, 0, 1];
    return (
      <div className={style.timeLine} style={this.inlineStyle}>
        {this.generateNotes(hourDayList, dateNote, utcOffset).map((text, i) =>
          <HourNote text={text} key={i} />
        )}
      </div>
    );
  }
}

export const HourNoteList = HourNoteListImpl;
