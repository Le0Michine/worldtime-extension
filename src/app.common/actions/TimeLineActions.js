export function addTimeLine(timeLine) {
  return {
    type: "ADD_TIMELINE",
    payload: timeLine
  };
}

export function removeTimeLine(timeLine) {
  return {
    type: "DELETE_TIMELINE",
    payload: timeLine
  };
}

export function replaceTimeLines(timeLines) {
  return {
    type: "REPLACE_TIMELINES",
    payload: timeLines
  };
}

export function editTimeLine(timeLine) {
  return {
    type: "EDIT_TIMELINE",
    payload: timeLine
  };
}