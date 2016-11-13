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