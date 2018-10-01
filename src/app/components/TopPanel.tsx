import AdjustIcon from "material-ui-icons/Adjust";
import KeyboardArrowLeftIcon from "material-ui-icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "material-ui-icons/KeyboardArrowRight";
import SettingsIcon from "material-ui-icons/Settings";
import IconButton from "material-ui/IconButton";
import Tooltip from "material-ui/Tooltip";
import * as React from "react";
import { connect } from "react-redux";
import { ActionCreator } from "redux";

import { changeScrollPostion, changeSelectedTimeSpan, resetScrollPostion } from "../../app.common/actions";
import { Clock } from "../../app.common/components";
import { DisplaySettingsInfo, ScrollPosition } from "../../app.common/models";
import { IAppState } from "../../app.common/store";
import * as style from "./Layout.scss";

interface ILayoutStateProps {
  timeLines?: any[];
  displaySettings?: DisplaySettingsInfo;
  scrollPosition?: ScrollPosition;
}

interface ILayoutDispatchProps {
  changeSelectedTimeSpan?: ActionCreator<any>,
  changeScrollPostion?: ActionCreator<any>,
  resetScrollPostion?: ActionCreator<any>,
}

type ILayoutProps = ILayoutStateProps & ILayoutDispatchProps;

class TopPanelImpl extends React.Component<ILayoutProps, any> {

  get positionCentered(): boolean {
    const { position } = this.props.scrollPosition;
    return position === 0;
  }

  get maxPositionReached(): boolean {
    const { position, step, maxLimit } = this.props.scrollPosition;
    return position + step > maxLimit;
  }

  get minPositionReached(): boolean {
    const { position, step, minLimit } = this.props.scrollPosition;
    return position - step < minLimit;
  }

  incrementScrollPosition() {
    const { position, step } = this.props.scrollPosition;
    this.props.changeScrollPostion(position + step);
  }

  decrementScrollPosition() {
    const { position, step } = this.props.scrollPosition;
    this.props.changeScrollPostion(position - step);
  }

  resetScrollPosition() {
    this.props.resetScrollPostion();
  }

  render(): React.ReactElement<any> {
    const {
      scrollPosition,
      displaySettings,
    } = this.props;
    const scrollStep = scrollPosition.step;
    return (
      <div className={style.app + " mx-auto"}>
        <div className={style.header}>
          <span className={style.clock}><Clock use24HoursFormat={displaySettings.use24HoursTime} /></span>
          <Tooltip title={`-${scrollStep} Hours`} placement="bottom">
            <IconButton
              disabled={this.maxPositionReached}
              onClick={() => this.incrementScrollPosition()}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Now" placement="bottom">
            <div>
              <IconButton
                disabled={this.positionCentered}
                onClick={() => this.resetScrollPosition()}
              >
                <AdjustIcon />
              </IconButton>
            </div>
          </Tooltip>
          <Tooltip title={`+${scrollStep} Hours`} placement="bottom">
            <IconButton
              disabled={this.minPositionReached}
              onClick={() => this.decrementScrollPosition()}
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
  }
}

export const TopPanel = connect<ILayoutStateProps, ILayoutDispatchProps, ILayoutProps>(
  (store: IAppState) => ({
    timeLines: store.timeLines,
    displaySettings: store.displaySettings,
    selectedTimeSpan: store.selectedTimeSpan,
    scrollPosition: store.scrollPosition,
  } as ILayoutProps),
  {
    changeSelectedTimeSpan: changeSelectedTimeSpan,
    changeScrollPostion: changeScrollPostion,
    resetScrollPostion: resetScrollPostion,
  }
)(TopPanelImpl);
