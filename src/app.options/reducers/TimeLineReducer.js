export const timeLines = function (state = [], action) {
  switch(action.type) {
    case "REPLACE_TIMELINES":
      return action.payload;
    case "ADD_TIMELINE": {
      const timeLines = [...state.timeLines, action.payload];
      return timeLines;
    }
    case "DELETE_TIMELINE": {
      const i = state.findIndex(x => x.name === action.payload.name);
      const timeLines = i > -1 ? state.slice(0, i).concat(state.slice(i + 1)) : state;
      return timeLines;
    }
    default:
      return state;
  }
};