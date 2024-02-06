import {
  LOGIN_INFO_UPDATE,
  ACCESS_TOKEN_UPDATE,
  LOGOUT_USER,
  UPDATE_LANG,
} from "../../actionsName";

const INITIAL_STATE = {
  login: null,
  accessToken: null,
  userLang: "",
};

const loginReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_INFO_UPDATE:
      return { ...state, login: action.payload };
    case ACCESS_TOKEN_UPDATE:
      return { ...state, accessToken: action.payload };
    case LOGOUT_USER:
      return { ...state, login: null };
    case UPDATE_LANG:
      return { ...state, userLang: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
