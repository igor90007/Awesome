import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { View, Alert, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import { getAddressFinally, getAddress, getCoords } from '../Actions/Common';
import { latitude, longitude, delta } from '../Config/Settings';

const adaptive = EStyleSheet.create({
  $darkBarStyle: '$barDarkStyle',
  $whiteColor: '$background',
  height: {
    height: '$exceptStatusBarHeight',
  },
});

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrap();

    this.state = {
      city: '',
      lastLat: latitude,
      lastLng: longitude,
    };

    this.attemptReverseGeocodeAsync = this.attemptReverseGeocodeAsync.bind(this);
    this.mapPress = this.mapPress.bind(this);
    this.markerPress = this.markerPress.bind(this);
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

    if (props.city && props.city !== '' && props.city !== state.city) {
      return {
        city: props.city,
        lastLat: props.lastLat,
        lastLng: props.lastLng,
      };
    }

    return null;
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.navigation.isFocused();
  }

  bootstrap() {
    navigator.geolocation.getCurrentPosition((geoSuccess, geoError) => {
      if (geoError) {
        Alert.alert(
          'Geo error',
          geoError,
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false },
        );
      } else {
        this.attemptReverseGeocodeAsync(geoSuccess.coords.latitude, geoSuccess.coords.longitude);
        this.mapPress(geoSuccess);
      }
    });
  }

  attemptReverseGeocodeAsync = async (lat, lon, nav = false) => {
    if (nav) {
      this.props.dispatch(getAddressFinally(lat, lon));
    } else {
      this.props.dispatch(getAddress(lat, lon));
    }
  }

  mapPress = (e) => {
    if (e.coords) {
      this.setState({
        lastLat: e.coords.latitude,
        lastLng: e.coords.longitude,
      });
    } else {
      this.setState({
        lastLat: e.nativeEvent.coordinate.latitude,
        lastLng: e.nativeEvent.coordinate.longitude,
      });
    }
  }

  markerPress = () => {
    this.attemptReverseGeocodeAsync(this.state.lastLat, this.state.lastLng, true);
  }

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={adaptive.$whiteColor}
          translucent={false}
          barStyle={adaptive.$darkBarStyle}
        />
        <MapView
          onLongPress={this.mapPress}
          style={adaptive.height}
          region={{
            latitudeDelta: delta,
            longitudeDelta: delta,
            latitude,
            longitude,
          }}
        >
          <MapView.Marker
            onPress={this.markerPress}
            coordinate={{
              latitude: this.state.lastLat,
              longitude: this.state.lastLng,
            }}
          />
        </MapView>
      </View>
    );
  }
}

MapScreen.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  error: PropTypes.any,
  city: PropTypes.string,
  lastLat: PropTypes.number,
  lastLng: PropTypes.number,
};

const mapStateToProps = state => ({
  error: state.Common.error,
  city: state.Common.city,
  lastLat: state.Common.lastLat,
  lastLng: state.Common.lastLng,
});

export default connect(mapStateToProps)(MapScreen);
