import * as actionTypes from "./actionTypes";

const template = (data, type) => {
  return {
    type: actionTypes[type],
    payload: data,
  };
};

export const set_auth = (mode) => {
  return template(mode, "AUTH");
};

export const set_message = (mode) => {
  return template(mode, "MESSAGE");
};
export const set_route_to_edit = (mode) => {
  return template(mode, "EDIT_ROUTE");
};
export const set_loading = (mode) => {
  return template(mode, "LOADING");
};
