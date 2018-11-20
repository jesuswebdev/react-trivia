import * as userActionTypes from "./actionTypes";

export const setUsername = username => {
  return {
    type: userActionTypes.SET_USERNAME,
    username
  };
};
