import { call, put } from 'redux-saga/effects';

import { apiGetMethod } from '../Sagas';

import {
  GET_ADDRESS_ERROR,
  GET_ADDRESS_RESULT,
  FINALLY_ADDRESS_RESULT,
} from '../Actions/Common';

const mapKey = '230de8bd9af133';

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
