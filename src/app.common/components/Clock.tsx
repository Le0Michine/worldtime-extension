import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import moment from "moment";

import { formatTime } from "../util/time.js";

interface ClockProps {
  use24HoursFormat: boolean;
}

export const Clock = ({ use24HoursFormat }: ClockProps) => {
  const [time, setTime] = useState<string>(
    formatTime(moment(), use24HoursFormat, true),
  );
  useEffect(() => {
    const interval = setInterval(
      () => setTime(formatTime(moment(), use24HoursFormat, true)),
      1000,
    );
    return () => clearInterval(interval);
  }, [use24HoursFormat]);

  return (
    <Typography component="h2" variant="h1">
      {time}
    </Typography>
  );
};
