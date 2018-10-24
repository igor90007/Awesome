import { takeLatest } from 'redux-saga/effects';

import {
  GET_ADDRESS_START,
  GET_COORDS_START,
  FINALLY_ADDRESS_START,
  FINALLY_ADDRESS_RESULT,
} from '../Actions/Common';

import { navigateOnMarkerTap } from './Navigation';
import { getAddr, getAddrFinally, getCoords } from './Common';

const API_URI = 'https://us1.locationiq.com/v1/';

// cause GET with 'body' makes crash
export const apiGetMethod = url => fetch(API_URI + url)
  .then(response => response.json());

export function* rootSaga() {
  yield takeLatest(GET_ADDRESS_START, getAddr);

  yield takeLatest(GET_COORDS_START, getCoords);

  yield takeLatest(FINALLY_ADDRESS_START, getAddrFinally);
  yield takeLatest(FINALLY_ADDRESS_RESULT, navigateOnMarkerTap);
}
