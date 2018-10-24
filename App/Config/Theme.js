import EStyleSheet from 'react-native-extended-stylesheet';
import { PixelRatio, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const pxRatio = PixelRatio.get();
export const deviceSizes = { deviceWidth: width * pxRatio, deviceHeight: height * pxRatio };

export const buildStyles = () => {
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
    $heightExtraSmall: '$deviceHeight * 0.1',
    $marginHorizontal: '$deviceWidth / 22',
    $textSize: '$deviceWidth / 30',
    $exceptStatusBarHeight: '$deviceHeight * 0.97',
  });
};