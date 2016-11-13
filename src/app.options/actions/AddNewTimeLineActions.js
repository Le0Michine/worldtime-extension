export function updateName(name) {
  return {
    type: "UPDATE_NAME",
    payload: name
  };
}

export function updateTimeZoneName(name) {
  return {
    type: "UPDATE_TIMEZONENAME",
    payload: name
  };
}

export function updateTimeZoneOffset(offset) {
  return {
    type: "UPDATE_TIMEZONEOFFSET",
    payload: offset
  };
}