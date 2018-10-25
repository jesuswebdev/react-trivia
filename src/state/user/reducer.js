import * as userActionTypes from "./actionTypes";

const initialState = {
  email: null,
  id: null,
  name: null,
  token: null
};

const userLoginSuccess = (state, action) => {
    let data = action.payload;
    return {
        ...state,
        email: data.user.email,
        id: data.user.id,
        name: data.user.name,
        role: data.user.role,
        token: data.token
    }
}

const logout = (state, action) => {
    return initialState;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case userActionTypes.USER_LOGIN_SUCCESS: return userLoginSuccess(state, action)
      case userActionTypes.USER_LOGOUT: return logout(state, action)
      default: return state;
  }
};

export default reducer;
