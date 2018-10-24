import { call, put } from 'redux-saga/effects';

import { apiGetMethod } from '../Sagas';

import { mapKey } from '../Config/Settings';

import {
  GET_ADDRESS_ERROR,
  GET_ADDRESS_RESULT,
  GET_COORDS_RESULT,
  FINALLY_ADDRESS_RESULT,
} from '../Actions/Common';

export function* getAddrFinally(action) {
  try {
    const apiEndpoint = `reverse.php?key=${mapKey}`;
    const response = yield call(
      apiGetMethod,
      `${apiEndpoint}&lat=${action.lastLat}&lon=${action.lastLng}&format=json`,
    );
    const res = { city: response.address.city, lat: action.lastLat, lon: action.lastLng };

    yield put({ type: FINALLY_ADDRESS_RESULT, res });
  } catch (e) {
    yield put({ type: GET_ADDRESS_ERROR, error: e.message });
  }
}

export function* getAddr(action) {
  try {
    const apiEndpoint = `reverse.php?key=${mapKey}`;
    const response = yield call(
      apiGetMethod,
      `${apiEndpoint}&lat=${action.lastLat}&lon=${action.lastLng}&format=json`,
    );
    const res = { city: response.address.city, lat: action.lastLat, lon: action.lastLng };

    yield put({ type: GET_ADDRESS_RESULT, res });
  } catch (e) {
    yield put({ type: GET_ADDRESS_ERROR, error: e.message });
  }
}

export function* getCoords(action) {
  try {
    const apiEndpoint = `search.php?key=${mapKey}`;
    const response = yield call(
      apiGetMethod,
      `${apiEndpoint}&q=${action.city}&format=json`,
    );
    const res = { city: action.city, lat: response[0].lat, lon: response[0].lon };

    yield put({ type: GET_COORDS_RESULT, res });
  } catch (e) {
    yield put({ type: GET_ADDRESS_ERROR, error: e.message });
  }
}
