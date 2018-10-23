import React from 'react';
import PropTypes from 'prop-types';

import { View, TouchableOpacity, Text, StatusBar } from 'react-native';
import { withNavigation } from 'react-navigation';

import { Title } from '../Text';

import styles from './styles';

const arrow = '<-';

class HeaderBack extends React.Component {
  constructor(props) {
    super(props);

    this.navigateBack = this.navigateBack.bind(this);
  }

  navigateBack = () => {
    const { backRoute } = this.props;

    const stub = backRoute ?
      this.props.navigation.navigate(backRoute) :
      this.props.navigation.goBack(null);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={styles.$whiteColor}
          translucent={false}
          barStyle={styles.$darkBarStyle}
        />
        <TouchableOpacity onPress={this.navigateBack} style={styles.center}>
          <Text style={styles.size}>{arrow}</Text>
        </TouchableOpacity>
        <Title state={this.state} props={this.props} />
      </View>
    );
  }
}

HeaderBack.propTypes = {
  navigation: PropTypes.any,
  backRoute: PropTypes.string,
};

export default withNavigation(HeaderBack);
