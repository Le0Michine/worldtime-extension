import { Theme, withTheme, withStyles } from "material-ui/styles";
import * as React from "react";

import * as style from "./TimeLine.scss";

interface HourCellProps {
  hour: number;
  isCurrent: boolean;
  use24HoursTime: boolean;
  theme: Theme;
}

class HourCellImpl extends React.Component<HourCellProps> {

  render() {
    const { hour, isCurrent, theme, use24HoursTime } = this.props;
    const classes = [style.hour];
    let background = theme.palette.primary[50];
    if (hour < 8 || hour > 21) {
      background = theme.palette.primary[100];
    }
    if (hour === 0) {
      background = theme.palette.primary[200];
    }
    if (isCurrent) {
      background = theme.palette.primary[700];
    }
    const color = theme.palette.getContrastText(background);
    const styles: React.CSSProperties = Object.assign({}, theme.typography.subheading, {
      background,
      color,
      borderBottom: theme.palette.grey.A400
    } as React.CSSProperties);
    let displayHour = String(hour);
    if (!use24HoursTime) {
      switch (hour) {
        case 0:
          displayHour = "am";
          break;
        case 12:
          displayHour = "pm";
          break;
        default:
          displayHour = String(hour % 12 + 1);
          break;
      }
    }
    return (
      <span className={classes.join(" ")} style={styles}>{displayHour}</span>
    );
  }
}

export const HourCell = withTheme<Partial<HourCellProps>>()(HourCellImpl);
