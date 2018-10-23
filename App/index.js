import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { PixelRatio, Dimensions } from 'react-native';
import { Provider } from 'react-redux';

import Navigator from './Config/Routes';
import store from './Config/Store';

import { setTopLevelNavigator } from './api';

const { width, height } = Dimensions.get('window');
const pxRatio = PixelRatio.get();
const deviceSizes = { deviceWidth: width * pxRatio, deviceHeight: height * pxRatio };

const buildStyles = () => {
  const widthNew = deviceSizes.deviceWidth;
  // const heightNew = deviceSizes.deviceHeight;

  EStyleSheet.build({
    // $outline: 1, // COMPONENTS LAYOUT for debug

    $deviceWidth: widthNew,
    $deviceHeight: height,
    $barDarkStyle: 'dark-content',
    $background: 'rgba(220, 220, 220, 1.0)',
    $white: 'rgba(250, 250, 250, 1.0)',
    $textColor: 'rgba(70, 70, 70, 1.0)',
    $deltaConst: 99,
    $latitudeConst: 0,
    $longitudeConst: 0,
    $heightExtraSmall: '$deviceHeight * 0.1',
    $marginHorizontal: '$deviceWidth / 22',
    $textSize: '$deviceWidth / 30',
  });
};

const handler = () => {
  EStyleSheet.clearCache();
};

class App extends React.Component {
  // region Methods
  componentWillMount() {
    buildStyles();

    Dimensions.addEventListener('change', handler);
  }

  componentDidMount() {
    buildStyles();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', handler);
  }

  render() {
    const { navigation } = this.props;

    return (
      <Navigator
        ref={(navigatorRef) => {
          setTopLevelNavigator(navigatorRef);
        }}
        navigation={navigation}
      />
    );
  }
}

App.propTypes = {
  navigation: PropTypes.object,
};

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
