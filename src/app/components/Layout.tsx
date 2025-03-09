import Paper from "@mui/material/Paper";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../app.common/store.js";
import { getPlatformInfo } from "../../app.common/util/platform-info.js";
import { BottomPanel } from "./BottomPanel.js";
import style from "./Layout.module.scss";
import { Timelines } from "./Timelines.js";
import { TopPanel } from "./TopPanel.js";

interface ILayoutProps {
  rangeColor?: string;
}

export const Layout = ({ rangeColor }: ILayoutProps) => {
  const [currentOs, setCurrentOs] = useState("");
  useEffect(() => {
    getPlatformInfo().then((info) => setCurrentOs(info.os));
  }, []);
  const scrollPosition = useSelector(
    (state: RootState) => state.scrollPosition,
  );
  const displaySettings = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const selectedTimeSpan = useSelector(
    (state: RootState) => state.selectedTimeSpan,
  );
  const rangeValue = useMemo(() => {
    const { position } = scrollPosition;
    const { startHour, startMinute, endHour, endMinute } = selectedTimeSpan;
    const { selectionStep } = displaySettings;
    const stepsInHour = 60 / selectionStep;
    const rangeSize = stepsInHour * 24;

    return {
      valueMin: Math.min(
        rangeSize,
        Math.max(
          (startHour + position) * stepsInHour + startMinute / selectionStep,
          0,
        ),
      ),
      valueMax: Math.max(
        Math.min(
          (endHour + position) * stepsInHour + endMinute / selectionStep,
          rangeSize,
        ),
        0,
      ),
      rangeSize,
    };
  }, [scrollPosition, selectedTimeSpan, displaySettings]);
  const startTime = moment()
    .hours(selectedTimeSpan.startHour)
    .minutes(selectedTimeSpan.startMinute);
  const endTime = moment()
    .hours(selectedTimeSpan.endHour)
    .minutes(selectedTimeSpan.endMinute);
  if (selectedTimeSpan.endHour === 24) {
    endTime.add({ days: 1 });
  }
  return (
    <Paper
      elevation={0}
      square
      className={`px-3 ${currentOs === "win" ? style.appWindows : style.appDefault}`}
    >
      <Paper
        elevation={0}
        square
        className={style.fixedPanel + " " + style.fixedPanelTop}
      >
        <TopPanel />
      </Paper>
      <Timelines rangeValue={rangeValue} rangeColor={rangeColor} />
      <Paper
        elevation={0}
        square
        className={style.fixedPanel + " " + style.fixedPanelBottom}
      >
        <BottomPanel rangeValue={rangeValue} rangeColor={rangeColor} />
      </Paper>
    </Paper>
  );
};
