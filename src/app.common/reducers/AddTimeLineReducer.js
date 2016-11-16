export const newTimeLine = function (state = {}, action) {
  switch(action.type) {
    case "EDIT/SELECT":
      return action.payload;
    default:
      return state;
  }
};