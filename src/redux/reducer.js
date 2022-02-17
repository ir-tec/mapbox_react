import * as actionTypes from "./actionTypes";
const initial = {
  auth: 0,
  message: "",
  editRoute: "",
  loading: false,
  verification_id: null,
};

export const reducer = (state = initial, action) => {
  let ret;
  switch (action.type) {
    case actionTypes.AUTH:
      ret = "auth";
      break;
    case actionTypes.EDIT_ROUTE:
      ret = "editRoute";
      break;
    case actionTypes.MESSAGE:
      ret = "message";
      break;
    case actionTypes.VERIFICATION_ID:
      ret = "verification_id";
      break;
    default:
      return state;
  }
  return { ...state, [ret]: action.payload };
};
