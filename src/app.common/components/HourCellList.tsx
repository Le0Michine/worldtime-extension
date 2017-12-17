import * as moment from "moment";
import * as React from "react";

import { HourCell } from "./HourCell";
import * as style from "./TimeLine.scss";

interface HourCellListProps {
  hours: number[];
  scrollOffset: number;
  utcOffset: number;
  use24HoursTime: boolean;
}

class HourCellListImpl extends React.Component<HourCellListProps> {

  get inlineStyle() {
    return {
      transform: `translateX(${this.props.scrollOffset}%)`
    };
  }

  render() {
    const { scrollOffset, utcOffset, hours, use24HoursTime } = this.props;
    const currentHour = Number(moment().utcOffset(utcOffset).format("HH"));
    return (
      <div className={style.timeLine} style={this.inlineStyle}>
        {[...hours, ...hours, ...hours].map((h, i) =>
          <HourCell hour={h} isCurrent={h === currentHour} use24HoursTime={use24HoursTime} key={`${h}_${i}`} />
        )}
      </div>
    );
  }
}

export const HourCellList = HourCellListImpl;
