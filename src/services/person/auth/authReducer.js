import { LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE } from "./authTypes";

const initialState = {
  isLoggedIn: "",
  emailAddress: "", 
  classification: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
      };
    case SUCCESS:
    case FAILURE:
      return {
        isLoggedIn: action.payload.isLoggedIn,
        emailAddress: action.payload.emailAddress,
        classification: action.payload.classification,
      };
    default:
      return state;
  }
};

export default reducer;