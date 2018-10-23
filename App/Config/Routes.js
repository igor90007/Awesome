import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MapScreen from '../Screens/MapScreen';
import WeatherScreen from '../Screens/WeatherScreen';

export default createStackNavigator(
  {
    MAP: MapScreen,
    WEATHER: WeatherScreen,
  },
  {
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: (sceneProps) => {
        const { position, layout, scene } = sceneProps;

        const thisSceneIndex = scene.index;
        const width = layout.initWidth;

        const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [width, 0, 0],
        });

        const slideFromRight = { transform: [{ translateX }] };

        return slideFromRight;
      },
    }),
  },
);
