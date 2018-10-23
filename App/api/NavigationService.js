import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigateTo(routeName, params) {
  navigator.dispatch(NavigationActions.navigate({
    routeName,
    params,
  }));
}

export {
  navigateTo,
  setTopLevelNavigator,
};
