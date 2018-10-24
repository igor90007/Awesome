import React from 'react';
import PropTypes from 'prop-types';

import { View, TextInput, Alert } from 'react-native';
import { connect } from 'react-redux';
import { WeatherWidget } from 'react-native-weather';

import { HeaderBack } from '../Components/Header';
import { getCoords } from '../Actions/Common';

let inputText = '';

class WeatherScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      city: props.city,
      lastLat: props.lastLat,
      lastLng: props.lastLng,
    };

    this.reloadWeather = this.reloadWeather.bind(this);
    this.getCity = this.getCity.bind(this);
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

    if ((props.lastLat !== state.lastLat || props.lastLng !== state.lastLng) && props.city !== state.city) {
      return {
        show: true,
        city: props.city,
        lastLat: props.lastLat,
        lastLng: props.lastLng,
      };
    }

    if (!props.city) {
      return {
        city: 'City undefined',
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  attemptGeocodeAsync = async (address) => {
    if (address.length > 3) {
      this.props.dispatch(getCoords(address));
    }
  };

  reloadWeather(text) {
    inputText = text;

    if (this.state.show) {
      this.setState({ show: false });
    }
  }

  getCity() {
    this.attemptGeocodeAsync(inputText);
  }

  render() {    
    return (
      <View style={{ flex: 1 }}>
        <HeaderBack backRoute="MAP" />
        <TextInput
          placeholder=" Type your city"
          onEndEditing={this.getCity}
          onChangeText={this.reloadWeather}
        />
        {this.state.show &&
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
