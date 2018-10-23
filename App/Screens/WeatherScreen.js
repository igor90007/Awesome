import React from 'react';
import PropTypes from 'prop-types';

import { View, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import { WeatherWidget } from 'react-native-weather';

import { HeaderBack } from '../Components/Header';
import { getCoords } from '../Actions/Common';

class WeatherScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      city: props.city,
      lastLat: props.lastLat,
      lastLng: props.lastLng,
    };

    this.reloadWeather = this.reloadWeather.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      Alert.alert(
        'Error',
        props.error,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false },
      );
    }

    return null;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  attemptGeocodeAsync = async (address) => {
    if (address.length > 2) {
      this.props.dispatch(getCoords(address));
    } else {
      // too short city
    }
  };

  reloadWeather(text) {
    this.setState({ city: false }, () => {
      this.attemptGeocodeAsync(text);
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <HeaderBack backRoute="MAP" />
        <TextInput
          placeholder=" Type your city"
          onChangeText={(text) => {
            this.reloadWeather(text);
          }}
        />
        {this.state.city &&
          <WeatherWidget
            api="abcae9a922160fa2c33690885b205ffa"
            lat={this.state.lastLat}
            lng={this.state.lastLng}
            location={this.state.city}
          />
        }
      </View>
    );
  }
}

WeatherScreen.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  city: PropTypes.string,
  lastLat: PropTypes.number,
  lastLng: PropTypes.number,
};

const mapStateToProps = state => ({
  city: state.Common.city,
  lastLat: state.Common.lastLat,
  lastLng: state.Common.lastLng,
});

export default connect(mapStateToProps)(WeatherScreen);
