import { Theme, withStyles } from "material-ui/styles";
import * as React from "react";

import { ClassMap } from "../models";
import { formatDate } from "../util/time";
import { HourNote } from "./HourNote";
import * as style from "./TimeLine.scss";

interface HourNoteListProps {
  hours: number[];
  scrollOffset: number;
  utcOffset: number;
}

class HourNoteListImpl extends React.Component<HourNoteListProps> {

  get inlineStyle() {
    return {
      transform: `translateX(${this.props.scrollOffset}%)`
    };
  }

  generateNotes(hours: number[], dateNote: string[]): string[] {
    const toDayNotes = (hours, date) => hours.map(x => x === 0 ? date : "")
    return dateNote.reduce((acc, x) => acc.concat(toDayNotes(hours, x)), []);
  }

  render() {
    const { hours, scrollOffset, utcOffset } = this.props;
    const dateNote = [-1, 0, 1].map(x => formatDate(utcOffset, x));
    return (
      <div className={style.timeLine} style={this.inlineStyle}>
        {this.generateNotes(hours, dateNote).map((text, i) =>
          <HourNote text={text} key={i} />
        )}
      </div>
    );
  }
}

export const HourNoteList = HourNoteListImpl;
