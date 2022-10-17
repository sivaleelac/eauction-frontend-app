import {PERSON_REQUEST, PERSON_FAILURE, PERSON_SAVED_SUCCESS} from './personTypes';

const initalState = {
    person: '',
    error: ''
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case PERSON_REQUEST:
          return {
            ...state
          };
        case PERSON_SAVED_SUCCESS:
          return {
            message: action.payload,
            error: ""
          };
        case PERSON_FAILURE:
          return {
            person: "",
            error: action.payload
          };          
        default:
          return state;
      }
}

export default reducer;