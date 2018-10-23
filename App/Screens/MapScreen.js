import React from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';

import { View, Alert, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';

import { getAddressFinally, getAddress } from '../Actions/Common';

const adaptive = EStyleSheet.create({
  $heightDevice: '$deviceHeight * 0.97',
  $darkBarStyle: '$barDarkStyle',
  $whiteColor: '$background',
  $constDelta: '$deltaConst',
  $constLatitude: '$latitudeConst',
  $constLongitude: '$longitudeConst',
});

class MapScreen extends React.Component {
  constructor(props) {
    super(props);
    this.bootstrap();

    this.state = {
      mapHeight: adaptive.$heightDevice,
      city: '',
      lastLat: adaptive.$constLatitude,
      lastLng: adaptive.$constLongitude,
    };

    this.attemptReverseGeocodeAsync = this.attemptReverseGeocodeAsync.bind(this);
    this.mapPress = this.mapPress.bind(this);
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

  attemptReverseGeocodeAsync = async (latitude, longitude, nav = false) => {
    const srub = nav ?
      this.props.dispatch(getAddressFinally(latitude, longitude)) :
      this.props.dispatch(getAddress(latitude, longitude));
  }

  mapPress(nativeEvent) {
    this.setState({
      lastLat: nativeEvent.coordinate.latitude,
      lastLng: nativeEvent.coordinate.longitude,
    });
  }

  markerPress() {
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
          onLongPress={e => this.mapPress(e.nativeEvent)}
          style={{ height: this.state.mapHeight }}
          region={{
            latitudeDelta: adaptive.$constDelta,
            longitudeDelta: adaptive.$constDelta,
            latitude: adaptive.$constLatitude,
            longitude: adaptive.$constLongitude,
          }}
        >
          <MapView.Marker
            onPress={() => this.markerPress()}
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
