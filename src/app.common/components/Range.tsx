import React, { useCallback, useEffect, useRef, useState } from "react";

interface IRangeProps {
  valueMin?: number;
  valueMax?: number;
  rangeSize?: number;
  onChange?: Function;
  color?: string;
}

export const Range = (props: IRangeProps) => {
  const rangeBaseRef = useRef<HTMLDivElement>(null);

  const getValueMin = useCallback(() => {
    return props.rangeSize
      ? (props.valueMin / props.rangeSize) * 100
      : props.valueMin;
  }, [props.rangeSize, props.valueMin]);

  const getValueMax = useCallback(() => {
    return props.rangeSize
      ? (props.valueMax / props.rangeSize) * 100
      : props.valueMax;
  }, [props.rangeSize, props.valueMax]);

  const [valueMin, setValueMin] = useState(getValueMin());
  const [valueMax, setValueMax] = useState(getValueMax());
  const [hold, setHold] = useState<false | "min" | "max">(false);

  const [onMouseMoveListener, setOnMouseMoveListener] =
    useState<(event: any) => void>();

  useEffect(() => {
    setValueMax(getValueMax());
    setValueMin(getValueMin());
  }, [getValueMin, getValueMax]);

  const onChange = useCallback((newMin, newMax) => {
    if (props.rangeSize) {
      const l = 100 / props.rangeSize;
      props.onChange?.({
        valueMin: Math.round(newMin / l),
        valueMax: Math.round(newMax / l),
      });
    } else {
      props.onChange?.({ valueMin: newMin, valueMax: newMax });
    }
  }, []);

  useEffect(() => {
    if (hold) {
      const moveListener = (event: MouseEvent) => {
        event.preventDefault();
        movePointer(getCoordinateInRange(event), hold);
      };
      window.addEventListener("mousemove", moveListener, false);

      const releaseListener = (event: MouseEvent) => {
        event.preventDefault();
        setHold(false);
        window.removeEventListener("mousemove", moveListener);
        window.removeEventListener("mouseup", releaseListener);
      };
      window.addEventListener("mouseup", releaseListener, false);
    }
  }, [hold, setHold]);

  const onRangeBaseClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      const x = getCoordinateInRange(event);
      const distToMin = Math.abs(x - valueMin);
      const distToMax = Math.abs(x - valueMax);
      const hold =
        distToMin == distToMax
          ? x > valueMax
            ? "max"
            : "min"
          : distToMin < distToMax
            ? "min"
            : "max";
      setHold(hold);
      movePointer(x, hold);
    },
    [valueMin, valueMax],
  );

  const getCoordinateInRange = useCallback(
    (event: MouseEvent | React.MouseEvent<any>) => {
      const rect = getRangeRect();
      return (
        ((Math.min(rect.right, Math.max(rect.left, event.clientX)) -
          rect.left) /
          rect.width) *
        100
      );
    },
    [],
  );

  const movePointer = useCallback(
    (x: number, hold: false | "min" | "max") => {
      const { rangeSize } = props;
      if (rangeSize) {
        const l = 100 / rangeSize;
        x = Math.round(x / l) * l;
      }
      if (hold === "min") {
        x = Math.min(x, valueMax);
        setValueMin(x);
        onChange(x, valueMax);
      } else if (hold === "max") {
        x = Math.max(x, valueMin);
        setValueMax(x);
        onChange(valueMin, x);
      } else {
        throw new Error("shouldn't go here");
      }
    },
    [props.rangeSize, valueMin, valueMax, setValueMin, setValueMax, onChange],
  );

  const getRangeRect = useCallback(() => {
    return rangeBaseRef.current?.getBoundingClientRect();
  }, [rangeBaseRef]);

  const getClickableAreaHeight = useCallback(() => {
    const appElement = document.getElementById("timeLinesContainer");
    if (appElement) {
      return appElement.clientHeight;
    } else {
      return 1000;
    }
  }, []);

  const { color } = props;
  const min = `${valueMin}%`;
  const max = `${valueMax}%`;
  const width = `${valueMax - valueMin}%`;
  const clickableAreaHeight = getClickableAreaHeight();

  const onMinClick = useCallback(() => setHold("min"), [setHold]);
  const onMaxClick = useCallback(() => setHold("max"), [setHold]);
  return (
    <div className="range-material-container">
      <div
        ref={rangeBaseRef}
        className="range-material-base-clickable"
        style={{ top: -clickableAreaHeight, paddingTop: clickableAreaHeight }}
        onMouseDown={onRangeBaseClick}
      >
        <div data-ref-bak="rangeBase" className="range-material-base">
          <div
            className="range-material-min-selector"
            style={{ left: min, background: color }}
            onMouseDown={onMinClick}
          ></div>
          <div
            className="range-material-range-selected"
            style={{ left: min, width, background: color }}
          ></div>
          <div
            className="range-material-max-selector"
            style={{ left: max, background: color }}
            onMouseDown={onMaxClick}
          ></div>
        </div>
      </div>
    </div>
  );
};
