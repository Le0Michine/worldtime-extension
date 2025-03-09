import style from "./TimeLine.module.scss";
import { makeStyles } from "../themes/themes";
import { Theme } from "@mui/material/styles";

interface HourNoteProps {
  text: string;
}

const useStyles = makeStyles()((theme: Theme) => ({
  hourNote: {
    color: theme.palette.getContrastText(theme.palette.background.paper),
  },
}));

export const HourNote = ({ text }: HourNoteProps) => {
  const { classes } = useStyles();
  return (
    <div className={`${style.hourNote} ${classes.hourNote}`}>{text}</div>
  );
};
