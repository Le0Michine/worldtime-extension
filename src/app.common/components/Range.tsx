import * as React from "react";
import * as ReactDOM from "react-dom";

interface IRangeProps {
  valueMin?: number;
  valueMax?: number;
  rangeSize?: number;
  onChange?: Function;
  color?: string;
}

interface IRangeState {
  valueMin: number;
  valueMax: number;
  hold: false | "min" | "max";
}

export class Range extends React.Component<IRangeProps, IRangeState> {
  private onMouseMoveListener;
  private onMouseUpListener;

  constructor(props: IRangeProps) {
    super(props);
    const { rangeSize, valueMin, valueMax } = props;
    this.state = {
      valueMin: rangeSize ? valueMin / rangeSize * 100 : valueMin,
      valueMax: rangeSize ? valueMax / rangeSize * 100 : valueMax,
      hold: false
    };
  }

  componentWillReceiveProps(props: IRangeProps) {
    if (props) {
      this.updateState(props);
    }
  }
  
  updateState(props: IRangeProps) {
    const { valueMax, valueMin, rangeSize } = props;
    this.setState({
      valueMin: rangeSize ? valueMin / rangeSize * 100 : valueMin,
      valueMax: rangeSize ? valueMax / rangeSize * 100 : valueMax,
    });
  }

  onChange(valueMin: number, valueMax: number) {
    if (this.props.onChange) {
      this.props.onChange(this.convertValues(valueMin, valueMax));
    }
  }

  convertValues(valueMin: number, valueMax: number) {
    if (this.props.rangeSize) {
      const l = 100 / this.props.rangeSize;
      return { valueMin: Math.round(valueMin / l), valueMax: Math.round(valueMax / l) };
    }
    return { valueMin, valueMax };
  }

  componentDidMount() {
    this.onMouseUpListener = () => this.onRelease();
    window.addEventListener("mouseup", this.onMouseUpListener, false);
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onMouseUpListener);
  }

  onHold(hold: false | "min" | "max") {
    this.setState({ hold });
    if (!this.onMouseMoveListener) {
      this.onMouseMoveListener = (event) => this.onMouseMove(event);
      window.addEventListener("mousemove", this.onMouseMoveListener, false);
    }
  }

  onRangeBaseClick(event: React.MouseEvent<HTMLDivElement>) {
    event.preventDefault();
    const { valueMin, valueMax } = this.state;
    const x = this.getCoordinateInRange(event);
    const distToMin = Math.abs(x - valueMin);
    const distToMax = Math.abs(x - valueMax);
    const hold = distToMin == distToMax
      ? x > valueMax
        ? "max"
        : "min"
      : distToMin < distToMax
        ? "min"
        : "max";
    this.onHold(hold);
    this.movePointer(x, hold);
  }

  onMouseMove(event: MouseEvent) {
    event.preventDefault();
    const { hold } = this.state;
    this.movePointer(this.getCoordinateInRange(event), hold);
  }

  getCoordinateInRange(event: MouseEvent | React.MouseEvent<any>) {
    const rect = this.getRangeRect();
    return (Math.min(rect.right, Math.max(rect.left, event.clientX)) - rect.left) / rect.width * 100;
  }

  movePointer(x: number, hold: false | "min" | "max") {
    const { valueMin, valueMax } = this.state;
    const { rangeSize } = this.props;
    if (rangeSize) {
      const l = 100 / rangeSize;
      x = Math.round(x / l) * l;
    }
    if (hold === "min") {
      x = Math.min(x, valueMax);
      this.setState({ valueMin: x });
      this.onChange(x, valueMax);
    } else if (hold === "max") {
      x = Math.max(x, valueMin);
      this.setState({ valueMax: x });
      this.onChange(valueMin, x);
    } else {
      throw new Error("shouldn't go here");
    }
  }

  onRelease() {
    this.setState({ hold: false });
    window.removeEventListener("mousemove", this.onMouseMoveListener);
    this.onMouseMoveListener = undefined;
  }

  getRangeRect() {
    return (ReactDOM.findDOMNode(this.refs["rangeBase"]) as Element).getBoundingClientRect();
  }

  getClicableAreaHeight() {
    const appElement = document.getElementById("timeLinesContainer");
    if (appElement) {
      return appElement.clientHeight;
    } else {
      return 1000;
    }
  }

  render() {
    const { valueMin, valueMax } = this.state;
    const { color } = this.props;
    const min = `${valueMin}%`;
    const max = `${valueMax}%`;
    const width = `${valueMax - valueMin}%`;
    const clicableAreaHeight = this.getClicableAreaHeight();
    return (
      <div className="range-material-container">
        <div ref="rangeBase" className="range-material-base-clickable" style={{ top: -clicableAreaHeight, paddingTop: clicableAreaHeight }} onMouseDown={(event) => this.onRangeBaseClick(event)}>
          <div ref="rangeBase" className="range-material-base">
            <div className="range-material-min-selector" style={{ left: min, background: color }} onMouseDown={() => this.onHold("min")}></div>
            <div className="range-material-range-selected" style={{ left: min, width, background: color }}></div>
            <div className="range-material-max-selector" style={{ left: max, background: color }} onMouseDown={() => this.onHold("max")}></div>
          </div>
        </div>
      </div>
    );
  }
}