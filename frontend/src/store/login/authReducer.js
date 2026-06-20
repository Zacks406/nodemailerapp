import { RESET_USER, USER, USER_FAILED, USER_SUCCESS } from "./types";

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER:
      return {
        ...INITIAL_STATE,
        loading: true,
      };
    case USER_SUCCESS:
      return {
        ...INITIAL_STATE,
        data: action.payload,
      };
    case USER_FAILED:
      return {
        ...INITIAL_STATE,
        error: action.payload,
      };
    case RESET_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default authReducer;
