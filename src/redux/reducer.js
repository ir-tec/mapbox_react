import * as actionTypes from "./actionTypes";
const initial = {
  auth: 0,
  message: "",
};

export const reducer = (state = initial, action) => {
  let ret;
  switch (action.type) {
    case actionTypes.AUTH:
      ret = "auth";
      break;
    case actionTypes.MESSAGE:
      ret = "message";
      break;
    default:
      return state;
  }
  return { ...state, [ret]: action.payload };
};
