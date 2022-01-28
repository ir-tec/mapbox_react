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
