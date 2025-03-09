import { useTheme, withTheme } from "@mui/styles";
import React from "react";

import style from "./TimeLine.module.scss";
import { Theme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { makeStyles } from "../themes/themes";

interface HourCellProps {
  hour: number;
  isCurrent: boolean;
  use24HoursTime: boolean;
  theme: Theme;
}

const useStyles = makeStyles()((theme) => {
  let backgroundDefault = theme.palette.primary[50];
  let backgroundNight = theme.palette.primary[100];
  let backgroundZero = theme.palette.primary[200];
  let backgroundNow = theme.palette.primary[700];
  if (theme.palette.mode === "dark") {
    backgroundDefault = theme.palette.primary.main;
    backgroundNight = theme.palette.primary.light;
    backgroundZero = theme.palette.grey.A400;
    backgroundNow = theme.palette.primary.dark;
  }
  return {
    hourNow: {
      background: backgroundNow,
      color: theme.palette.getContrastText(backgroundNow),
      borderBottom: theme.palette.grey.A400,
      fontSize: "16px",
      lineHeight: "24px",
    },
    hourZero: {
      background: backgroundZero,
      color: theme.palette.getContrastText(backgroundZero),
      borderBottom: theme.palette.grey.A400,
      fontSize: "16px",
      lineHeight: "24px",
    },
    hourNight: {
      background: backgroundNight,
      color: theme.palette.getContrastText(backgroundNight),
      borderBottom: theme.palette.grey.A400,
      fontSize: "16px",
      lineHeight: "24px",
    },
    hourDefault: {
      background: backgroundDefault,
      color: theme.palette.getContrastText(backgroundDefault),
      borderBottom: theme.palette.grey.A400,
      fontSize: "16px",
      lineHeight: "24px",
    },
  };
});

export const HourCell = withTheme(
  ({ hour, isCurrent, use24HoursTime }: HourCellProps) => {
    const theme = useTheme<Theme>();
    const { classes } = useStyles();
    let className = classes.hourDefault;
    let background = theme.palette.primary[50];
    if (hour < 8 || hour > 21) {
      className = classes.hourNight;
      background = theme.palette.primary[100];
    }
    if (hour === 0) {
      className = classes.hourZero;
      background = theme.palette.primary[200];
    }
    if (isCurrent) {
      className = classes.hourNow;
      background = theme.palette.primary[700];
    }
    const color = theme.palette.getContrastText(background);
    const styles: React.CSSProperties = {
      ...theme.typography.h3,
      background,
      color,
      borderBottom: theme.palette.grey.A400,
      fontSize: "16px",
      lineHeight: "24px",
    };
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
          displayHour = String(hour % 12);
          break;
      }
    }
    return (
      <Typography
        component="span"
        variant="h3"
        className={`${style.hour} ${className}`}
        // style={styles}
      >
        {displayHour}
      </Typography>
    );
  },
);
