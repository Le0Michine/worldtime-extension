import { Theme, withStyles } from "material-ui/styles";
import { formatTime, getTimeZoneAbbreviation } from "../../app.common/util/time";
import { Suggestion } from "../../app.common/models/TimeZoneShort";
import * as React from "react";
import { connect, ActionCreator } from "react-redux";
import * as moment from "moment-timezone";
import * as _ from "lodash";
import Button from "material-ui/Button";
import { MenuItem } from "material-ui/Menu";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import Input, { InputLabel } from "material-ui/Input";
import { FormControl, FormHelperText } from "material-ui/Form";
import * as d3 from "d3";
import * as topojson from "topojson";
import * as style from "./WorldMap.scss";
const world110 = require("../../assets/world-110m.json");
const timezoneMeta = require("../../assets/momet-timezone-meta.json");

import { TimeZoneInfo } from "../../app.common/models";
import { Typeahead } from "../../app.common/components";
import { changeDisplayName, changeTimezoneId, createOrUpdateTimeLine, clearForm } from "../../app.common/actions";
import { IAppState } from "../../app.common/store";
import { KeyboardEvent } from "react";
import Typography from "material-ui/Typography/Typography";

interface WorldMapProps {
  classes: any;
  useDarkTheme: boolean;
  use24TimeFormat: boolean;
  timeZoneId: string;
  onSelect: (timeZoneId: string) => void;
}

interface WorldMapState {
  pointerX: number;
  pointerY: number;
  selectedPoint: string;
  mouseHover: boolean;
}

interface MapPoint {
  x: number;
  y: number;
  name: string;
}

class WorldMapImpl extends React.Component<WorldMapProps, WorldMapState> {

  private points: MapPoint[];

  constructor(props) {
    super(props);
    const projection = this.projection;
    const guessedZone = props.timeZoneId || moment.tz.guess();
    const guessedZoneMeta = timezoneMeta.zones[guessedZone];
    const [x, y] = guessedZoneMeta
      ? projection([guessedZoneMeta.long, guessedZoneMeta.lat])
      : [0, 0];
    const points = _.chain(timezoneMeta.zones).map((zone: any) => {
      const [x, y] = projection([zone.long, zone.lat])
      const { name } = zone;
      return { x, y, name }
    }).filter(x => Boolean(moment.tz.zone(x.name))).value();
    this.points = points;
    this.state = {
      pointerX: x,
      pointerY: y,
      selectedPoint: guessedZone,
      mouseHover: false,
    };
  }

  get mapSize() {
    const { clientWidth, clientHeight } = document.documentElement;
    return { width: (clientWidth - 48) * 0.6, height: (clientHeight - 68 * 2 - 50) * 0.8 };
  }

  get mapPath() {
    const path = d3.geoPath().projection(this.projection);
    return path(world110);
  }

  get projection() {
    const { width, height } = this.mapSize;
    return d3.geoEquirectangular()
      .scale(width / 2 / Math.PI)
      .translate([width / 2, height / 2]);
  }

  getPoints() {
    const { classes } = this.props;
    const { selectedPoint } = this.state;
    const timezones = moment.tz.names();
    const projection = this.projection;
    const points = this.points.map(zone => {
      const { x, y, name } = zone;
      const pointClasses = [style.point, classes.point];
      if (name === selectedPoint) {
        pointClasses.push(style.pointSelected);
      }
      if (name === this.props.timeZoneId) {
        pointClasses.push(style.pointSelected);
        pointClasses.push(classes.pointSelected);
      }
      return (
        <span
          key={name}
          style={{
            left: `${x}px`,
            top: `${y}px`
          }}
          className={pointClasses.join(" ")}
        ></span>
      );
    });
    return (
      <div className={style.pointsContainer}>
        {points}
      </div>
    );
  }

  getEuclideanDistance(point1: number[], point2: number[]): number {
    return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
  }

  onMouseLeave() {
    this.setState({ mouseHover: false });
  }

  onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY, currentTarget } = event;
    const { width: mapWidth, height: mapHeight, top, left } = currentTarget.getBoundingClientRect();
    const mouseX = clientX - left;
    const mouseY = clientY - top;
    const minDistance = _.chain(this.points).map(x => ({
      point: x,
      distance: this.getEuclideanDistance([x.x, x.y], [mouseX, mouseY])
    })).minBy("distance").value();
    this.setState({
      pointerX: minDistance.point.x,
      pointerY: minDistance.point.y,
      selectedPoint: minDistance.point.name,
      mouseHover: true,
    });
  }

  onSelect(value: string) {
    this.props.onSelect(value);
  }

  render() {
    const { classes, use24TimeFormat } = this.props;
    const { width, height } = this.mapSize;
    const { pointerX, pointerY, mouseHover } = this.state;
    const selectedPoint = !this.state.mouseHover && this.props.timeZoneId
      ? this.props.timeZoneId
      : this.state.selectedPoint;
    const selectedZone = moment.tz.zone(selectedPoint);
    const selectedZoneTime = moment.tz(selectedZone.name);
    const formattedTime = formatTime(selectedZoneTime, use24TimeFormat);

    return (
      <Paper elevation={0}>
        <Typography className="text-center">{selectedZone.name} {formattedTime} {selectedZone.abbr(selectedZoneTime.unix())}</Typography>
        <div
          className={`d-flex align-items-center justify-content-center ${classes.mapContainer}`}
          onMouseMove={(event) => this.onMouseMove(event)}
          onMouseLeave={() => this.onMouseLeave()}
          onClick={() => this.onSelect(selectedPoint)}
        >
          <div className={`${classes.mapAxis} ${style.mapAxis} ${style.mapAxisX}`} style={{ top: pointerY }}></div>
          <div className={`${classes.mapAxis} ${style.mapAxis} ${style.mapAxisY}`} style={{ left: pointerX }}></div>
          <svg
            id="map"
            className={classes.map}
            width={width}
            height={height}
          >
            <path d={this.mapPath}></path>
          </svg>
          {this.getPoints()}
        </div>
      </Paper>
    );
  }
}

const styles = (theme: Theme): { [className: string]: React.CSSProperties } => ({
  map: {
    stroke: theme.palette.type === "dark"
      ? theme.palette.common.lightWhite
      : theme.palette.common.lightBlack,
    fill: theme.palette.common.faintBlack,
  },
  mapContainer: {
    background: theme.palette.background.contentFrame,
    position: "relative",
  },
  mapAxis: {
    borderColor: theme.palette.type === "dark"
      ? theme.palette.common.lightWhite
      : theme.palette.common.lightBlack,
  },
  point: {
    borderColor: theme.palette.type === "dark"
      ? theme.palette.common.lightWhite
      : theme.palette.common.lightBlack,
  },
  pointSelected: {
    borderColor: theme.palette.secondary.A400,
  }
});

export const WorldMap = withStyles(styles)(WorldMapImpl) as React.ComponentClass<Partial<WorldMapProps>>;
