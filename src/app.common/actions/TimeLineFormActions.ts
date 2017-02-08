import { ActionCreator } from "react-redux";
import * as Redux from "redux";
import { Action } from "./Action";
import { TimeZoneInfo, createTimeZoneInfo } from "../models";
import { Field, reduxForm, initialize } from 'redux-form';

export function clearForm(id: number): Redux.Action {
  const timeLine = Object.assign({}, { id, name: "", timeZoneName: "", timeZoneOffset: "" });
  return initialize("editTimeLineForm", timeLine, false);
}