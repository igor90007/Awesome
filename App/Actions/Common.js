export const GET_ADDRESS_START = 'GET_ADDRESS_START';
export const GET_ADDRESS_ERROR = 'GET_ADDRESS_ERROR';
export const GET_ADDRESS_RESULT = 'GET_ADDRESS_RESULT';
export const FINALLY_ADDRESS_START = 'FINALLY_ADDRESS_START';
export const FINALLY_ADDRESS_RESULT = 'FINALLY_ADDRESS_RESULT';

export const getAddress = (lastLat, lastLng) => ({
  type: GET_ADDRESS_START,
  lastLat,
  lastLng,
});

export const getAddressFinally = (lastLat, lastLng) => ({
  type: FINALLY_ADDRESS_START,
  lastLat,
  lastLng,
});
