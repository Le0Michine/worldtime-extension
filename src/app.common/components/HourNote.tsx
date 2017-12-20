import { Theme, withStyles } from "material-ui/styles";
import * as React from "react";

import * as style from "./TimeLine.scss";
import { ClassMap } from "../models";

interface HourNoteProps {
  text: string;
  classes: any;
}

class HourNoteImpl extends React.Component<HourNoteProps> {

  render() {
    const { text, classes } = this.props;

    return (
      <span className={`${style.hourNote} ${classes.hourNote}`}>{text}</span>
    );
  }
}

const styles = (theme: Theme): ClassMap => ({
  hourNote: {
    color: theme.palette.getContrastText(theme.palette.background.paper),
  }
});

export const HourNote = withStyles(styles)(HourNoteImpl) as React.ComponentClass<Partial<HourNoteProps>>;
