import { USER_ADD, USER_REMOVE, USER_GET } from "../actions/user";

const userReducer = (state = 0, action) => {
  switch (action.type) {
    case USER_ADD:
      return { ...state, user: action.value };
    case USER_REMOVE:
      return { ...state, user: {} };
    case USER_GET:
      return { ...state };
    default:
      return { ...state };
  }
};

export default userReducer;
