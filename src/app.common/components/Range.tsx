// tslint:disable:typedef
// tslint:disable:max-line-length
import * as React from "react";
import * as ReactDOM from "react-dom";

interface IRangeProps {
  valueMin?: number;
  valueMax?: number;
  rangeSize?: number;
  onChange?: Function;
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
    this.state = {
      valueMin: props.rangeSize ? props.valueMin / props.rangeSize * 100 : props.valueMin,
      valueMax: props.rangeSize ? props.valueMax / props.rangeSize * 100 : props.valueMax,
      hold: false
    };
  }

  static propTypes = {
    valueMin: React.PropTypes.number.isRequired,
    valueMax: React.PropTypes.number.isRequired,
    rangeStep: React.PropTypes.number,
    onChange: React.PropTypes.func
  };

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
    const hold = Math.abs(x - valueMin) <= Math.abs(x - valueMax) ? "min" : "max";
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
    // tslint:disable-next-line:no-string-literal
    return ReactDOM.findDOMNode(this.refs["rangeBase"]).getBoundingClientRect();
  }

  render() {
    const { valueMin, valueMax } = this.state;
    const min = `${valueMin}%`;
    const max = `${valueMax}%`;
    const width = `${valueMax - valueMin}%`;
    return (
      <div className="range-material-container">
        <div ref="rangeBase" className="range-material-base" onMouseDown={(event) => this.onRangeBaseClick(event)}>
          <div className="range-material-min-selector" style={{left: min}} onMouseDown={() => this.onHold("min")}></div>
          <div className="range-material-range-selected" style={{left: min, width}}></div>
          <div className="range-material-max-selector" style={{left: max}} onMouseDown={() => this.onHold("max")}></div>
        </div>
      </div>
    );
  }
}