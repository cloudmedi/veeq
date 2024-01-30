import {
  LOGIN_INFO_UPDATE,
  ACCESS_TOKEN_UPDATE,
  LOGOUT_USER,
} from "../../actionsName";

const INITIAL_STATE = {
  login: null,
  accessToken: null,
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_INFO_UPDATE:
      return { ...state, login: action.payload };
    case ACCESS_TOKEN_UPDATE:
      return { ...state, accessToken: action.payload };
    case LOGOUT_USER:
      return { ...state, login: null };
    default:
      return state;
  }
};

export default loginReducer;
