import Paper from "material-ui/Paper";
import * as moment from "moment";
import * as React from "react";
import { connect } from "react-redux";
import { ActionCreator } from "redux";

import { changeScrollPostion, changeSelectedTimeSpan, resetScrollPostion } from "../../app.common/actions";
import { DisplaySettingsInfo, RangeValue, ScrollPosition, TimeSpanInfo } from "../../app.common/models";
import { IAppState } from "../../app.common/store";
import { getPlatformInfo } from "../../app.common/util/platforminfo";
import { BottomPanel } from "./BottomPanel";
import * as style from "./Layout.scss";
import { Timelines } from "./Timelines";
import { TopPanel } from "./TopPanel";

interface ILayoutStateProps {
  timeLines?: any[];
  displaySettings?: DisplaySettingsInfo;
  selectedTimeSpan?: TimeSpanInfo;
  rangeColor?: string;
  scrollPosition?: ScrollPosition;
}

interface ILayoutDispatchProps {
  changeSelectedTimeSpan?: ActionCreator<any>,
  changeScrollPostion?: ActionCreator<any>,
  resetScrollPostion?: ActionCreator<any>,
}

interface ILayoutState {
  currentOs: string;
}

type ILayoutProps = ILayoutStateProps & ILayoutDispatchProps;

class LayoutImpl extends React.Component<ILayoutProps, ILayoutState> {

  constructor(props) {
    super(props);
    this.state = {
      currentOs: ""
    }
    getPlatformInfo().then(info => this.setState({ currentOs: info.os }));
  }

  get rangeValue(): RangeValue {
    const { currentOs } = this.state;
    const { position } = this.props.scrollPosition;
    const { startHour, startMinute, endHour, endMinute } = this.props.selectedTimeSpan;
    const { selectionStep } = this.props.displaySettings;
    const stepsInHour = 60 / selectionStep;
    const rangeSize = stepsInHour * 24;

    return {
      valueMin: Math.min(rangeSize, Math.max((startHour + position) * stepsInHour + startMinute / selectionStep, 0)),
      valueMax: Math.max(Math.min((endHour + position) * stepsInHour + endMinute / selectionStep, rangeSize), 0),
      rangeSize,
    };
  }

  render(): React.ReactElement<any> {
    const { currentOs } = this.state;
    const {
      displaySettings,
      selectedTimeSpan,
      timeLines,
      rangeColor,
      scrollPosition
    } = this.props;
    const scrollStep = scrollPosition.step;
    const { valueMin, valueMax, rangeSize } = this.rangeValue;
    const startTime = moment().hours(selectedTimeSpan.startHour).minutes(selectedTimeSpan.startMinute);
    const endTime = moment().hours(selectedTimeSpan.endHour).minutes(selectedTimeSpan.endMinute);
    if (selectedTimeSpan.endHour === 24) {
      endTime.add({ days: 1 });
    }
    const duration = moment.duration((selectedTimeSpan.endHour - selectedTimeSpan.startHour) * 60 + (selectedTimeSpan.endMinute - selectedTimeSpan.startMinute), "minutes");
    const buttonDisabled = false;
    return (
      <Paper elevation={0} square className={`px-3 ${currentOs === "win" ? style.appWindows : style.appDefault}`}>
        <Paper elevation={0} square className={style.fixedPanel + " " + style.fixedPanelTop}>
          <TopPanel />
        </Paper>
        <Timelines rangeValue={this.rangeValue} rangeColor={rangeColor} />
        <Paper elevation={0} square className={style.fixedPanel + " " + style.fixedPanelBottom}>
          <BottomPanel rangeValue={this.rangeValue} rangeColor={rangeColor} />
        </Paper>
      </Paper>
    );
  }
}

export const Layout = connect<ILayoutStateProps, ILayoutDispatchProps, ILayoutProps>(
  (store: IAppState) => ({
    timeLines: store.timeLines,
    displaySettings: store.displaySettings,
    selectedTimeSpan: store.selectedTimeSpan,
    scrollPosition: store.scrollPosition,
  } as ILayoutProps),
  {
  }
)(LayoutImpl);
