import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { Dimensions } from 'react-native';
import { Provider } from 'react-redux';

import Navigator from './Config/Routes';
import store from './Config/Store';

import { setTopLevelNavigator } from './api';
import { buildStyles } from './Config/Theme';

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
