import {PERSON_REQUEST, PERSON_FAILURE, PERSON_SAVED_SUCCESS} from './personTypes';
import axios from 'axios';

const REGISTER_URL = "http://3.84.148.234:8060/api/v1/person/register";

export const registerPerson = (personObject) => async (dispatch) => {
    dispatch(personRequest());
    try {
      const response = await axios.post(REGISTER_URL, personObject);
      dispatch(personSavedSuccess(response.data));
      return Promise.resolve(response.data);
    } catch (error) {
      dispatch(personFailure(error.message));
      return Promise.reject(error);
    }
};

const personRequest = () => {
    return {
        type: PERSON_REQUEST
    };
};

const personSavedSuccess = (person) => {
    return {
        type: PERSON_SAVED_SUCCESS,
        payload: person
    };
};

const personFailure = (error) => {
    return {
        type: PERSON_FAILURE,
        payload: error
    };
};