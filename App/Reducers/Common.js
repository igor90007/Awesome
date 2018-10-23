import {
  GET_ADDRESS_START,
  GET_ADDRESS_ERROR,
  GET_ADDRESS_RESULT,
  FINALLY_ADDRESS_START,
  FINALLY_ADDRESS_RESULT,
  GET_COORDS_START,
  GET_COORDS_ERROR,
  GET_COORDS_RESULT,
} from '../Actions/Common';

const initialState = {
  error: null,
  city: '',
  lastLat: 0,
  lastLng: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS_START:
      return {
        ...state,
        error: null,
      };
    case GET_ADDRESS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case GET_ADDRESS_RESULT:
      return {
        ...state,
        lastLat: action.res.lat,
        lastLng: action.res.lon,
        city: action.res.city,
      };
    case FINALLY_ADDRESS_START:
      return {
        ...state,
        error: null,
      };
    case FINALLY_ADDRESS_RESULT:
      return {
        ...state,
        city: action.res.city,
        lastLat: action.res.lat,
        lastLng: action.res.lon,
      };
    case GET_COORDS_START:
      return {
        ...state,
        error: null,
      };
    case GET_COORDS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case GET_COORDS_RESULT:
      return {
        ...state,
        lastLat: Number(action[0].lat),
        lastLng: Number(action[0].lat),
      };
    default:
      return state;
  }
};

export default reducer;
