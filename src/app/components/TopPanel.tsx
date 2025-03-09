import AdjustIcon from "@mui/icons-material/Adjust";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Clock } from "../../app.common/components/Clock.js";
import { RootState } from "../../app.common/store.js";

import style from "./Layout.module.scss";
import {
  resetScrollPosition,
  setScrollPosition,
} from "../../app.common/reducers/ScrollPositionReducer.js";

export const TopPanel = () => {
  const dispatch = useDispatch();
  const { use24HoursTime } = useSelector(
    (state: RootState) => state.displaySettings,
  );
  const scrollPosition = useSelector(
    (state: RootState) => state.scrollPosition,
  );
  const positionCentered = useMemo(
    () => scrollPosition.position === 0,
    [scrollPosition.position],
  );

  const maxPositionReached = useMemo(() => {
    const { position, step, maxLimit } = scrollPosition;
    return position + step > maxLimit;
  }, [scrollPosition]);

  const minPositionReached = useMemo(() => {
    const { position, step, minLimit } = scrollPosition;
    return position - step < minLimit;
  }, [scrollPosition]);

  const onResetScrollPosition = useCallback(
    () => dispatch(resetScrollPosition()),
    [dispatch, scrollPosition],
  );

  const incrementScrollPosition = useCallback(() => {
    const { position, step } = scrollPosition;
    dispatch(setScrollPosition(position + step));
  }, [dispatch, scrollPosition]);

  const decrementScrollPosition = useCallback(() => {
    const { position, step } = scrollPosition;
    dispatch(setScrollPosition(position - step));
  }, [scrollPosition, dispatch]);

  return (
    <div className={`${style.app} mx-auto`}>
      <div className={style.header}>
        <span className={style.clock}>
          <Clock use24HoursFormat={use24HoursTime} />
        </span>
        <Tooltip title={`-${scrollPosition.step} Hours`} placement="bottom">
          <IconButton
            disabled={maxPositionReached}
            onClick={incrementScrollPosition}
            size="large"
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Now" placement="bottom">
          <div>
            <IconButton
              disabled={positionCentered}
              onClick={onResetScrollPosition}
            >
              <AdjustIcon />
            </IconButton>
          </div>
        </Tooltip>
        <Tooltip title={`+${scrollPosition.step} Hours`} placement="bottom">
          <IconButton
            disabled={minPositionReached}
            onClick={() => decrementScrollPosition()}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings" placement="bottom">
          <IconButton aria-label="settings" target="_blank" href="options.html">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
