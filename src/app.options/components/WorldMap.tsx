import * as d3 from "d3";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import moment from "moment-timezone";
import React, { useCallback, useMemo, useState } from "react";
import minBy from "lodash-es/minBy.js";

import { formatTime } from "../../app.common/util/time.js";
import style from "./WorldMap.module.scss";

import world110 from "../../assets/world-110m.json" with { type: "json" };
import timezoneMeta from "../../assets/moment-timezone-meta.json" with { type: "json" };
import { makeStyles } from "../../app.common/themes/themes.js";

interface WorldMapProps {
  use24TimeFormat: boolean;
  timeZoneId: string;
  onSelect: (timeZoneId: string) => void;
}

interface MapPoint {
  x: number;
  y: number;
  name: string;
}

export const WorldMap = (props: WorldMapProps) => {
  const { classes } = useStyles();
  const mapSize = useMemo(() => {
    const { clientHeight } = document.documentElement;
    const height = (clientHeight - 68 * 2 - 50) * 0.8;
    return { width: height * 2, height: height };
  }, []);

  const projection = useMemo(() => {
    const { width, height } = mapSize;
    return d3
      .geoEquirectangular()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 2]);
  }, []);
  const guessedZone = props.timeZoneId || moment.tz.guess();
  const guessedZoneMeta = timezoneMeta.zones[guessedZone];
  const [x, y] = guessedZoneMeta
    ? projection([guessedZoneMeta.long, guessedZoneMeta.lat])
    : [0, 0];
  const points: MapPoint[] = useMemo(
    () =>
      Object.values(timezoneMeta.zones)
        .map((zone: any) => {
          const [x, y] = projection([zone.long, zone.lat]);
          const { name } = zone;
          return { x, y, name };
        })
        .filter((x) => Boolean(moment.tz.zone(x.name))),
    [projection, timezoneMeta],
  );

  const [pointerLocation, setPointerLocation] = useState({ x, y });
  const [selectedPointState, setSelectedPointState] = useState(guessedZone);
  const [mouseHover, setMouseHover] = useState(false);

  const mapPath = useMemo(() => {
    const path = d3.geoPath().projection(projection);
    return path(world110 as any);
  }, []);

  const selectedTimeZonePosition = useCallback((timeZoneId: string) => {
    const selectedZoneMeta = timezoneMeta.zones[timeZoneId];
    const [x, y] = selectedZoneMeta
      ? projection([selectedZoneMeta.long, selectedZoneMeta.lat])
      : [0, 0];
    return { x, y };
  }, []);

  const renderedPoints = useMemo(() => {
    const mapPoints = points.map((zone) => {
      const { x, y, name } = zone;
      const pointClasses = [style.point, classes.point];
      if (name === selectedPointState) {
        pointClasses.push(style.pointSelected);
      }
      if (name === props.timeZoneId) {
        pointClasses.push(style.pointSelected);
        pointClasses.push(classes.pointSelected);
      }
      return (
        <span
          key={name}
          style={{
            left: `${x}px`,
            top: `${y}px`,
          }}
          className={pointClasses.join(" ")}
        ></span>
      );
    });
    return <div className={style.pointsContainer}>{mapPoints}</div>;
  }, [selectedPointState, points, classes, props.timeZoneId]);

  const getEuclideanDistance = useCallback(
    (point1: number[], point2: number[]): number => {
      return Math.sqrt(
        Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2),
      );
    },
    [],
  );

  const onMouseLeave = useCallback(() => {
    setMouseHover(false);
  }, []);

  const onMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = event;
    const { top, left } = currentTarget.getBoundingClientRect();
    const mouseX = clientX - left;
    const mouseY = clientY - top;
    const minDistance = minBy(
      points.map((x) => ({
        point: x,
        distance: getEuclideanDistance([x.x, x.y], [mouseX, mouseY]),
      })),
      "distance",
    );
    setPointerLocation({ x: minDistance.point.x, y: minDistance.point.y });
    setSelectedPointState(minDistance.point.name);
    setMouseHover(true);
  }, []);

  const { use24TimeFormat } = props;
  const { width, height } = mapSize;
  const selectedPoint =
    !mouseHover && props.timeZoneId ? props.timeZoneId : selectedPointState;
  const { x: pointerX, y: pointerY } = selectedTimeZonePosition(selectedPoint);
  const selectedZone = moment.tz.zone(selectedPoint);
  const selectedZoneTime = moment.tz(selectedZone.name);
  const formattedTime = formatTime(selectedZoneTime, use24TimeFormat);

  return (
    <Paper elevation={0}>
      <Typography variant="subtitle1" className="text-center">
        {selectedZone.name} {formattedTime}{" "}
        {selectedZone.abbr(selectedZoneTime.unix())}
      </Typography>
      <div
        className={`d-flex align-items-center justify-content-center ${classes.mapContainer}`}
        onMouseMove={(event) => onMouseMove(event)}
        onMouseLeave={() => onMouseLeave()}
        onClick={() => props.onSelect(selectedPoint)}
      >
        <div
          className={`${classes.mapAxis} ${style.mapAxis} ${style.mapAxisX}`}
          style={{ top: pointerY }}
        ></div>
        <div
          className={`${classes.mapAxis} ${style.mapAxis} ${style.mapAxisY}`}
          style={{ left: pointerX }}
        ></div>
        <svg id="map" className={classes.map} width={width} height={height}>
          <path d={mapPath}></path>
        </svg>
        {renderedPoints}
      </div>
    </Paper>
  );
};

const useStyles = makeStyles()((theme) => ({
  map: {
    stroke:
      theme.palette.mode === "dark"
        ? theme.palette.grey.A100
        : theme.palette.grey[50],
    fill: theme.palette.grey[500],
  },
  mapContainer: {
    background: theme.palette.background.paper,
    position: "relative",
  },
  mapAxis: {
    borderColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[50]
        : theme.palette.primary.main,
  },
  point: {
    borderColor:
      theme.palette.mode === "dark"
        ? theme.palette.common.white
        : theme.palette.common.black,
  },
  pointSelected: {
    borderColor: theme.palette.primary.main,
  },
}));
