import { navigateTo } from '../api';

export function* navigateOnMarkerTap() {
  yield navigateTo('WEATHER');
}

export function* test() {
  yield navigateTo('WEATHER');
}
