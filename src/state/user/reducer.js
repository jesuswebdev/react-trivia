import * as userActionTypes from "./actionTypes";

const initialState = {
  username: ""
};

const setUsername = (state, action) => {
  return {
    ...state,
    username: action.username
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userActionTypes.SET_USERNAME:
      return setUsername(state, action);
    default:
      return state;
  }
};

export default reducer;
