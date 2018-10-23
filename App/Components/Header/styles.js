import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $darkBarStyle: '$barDarkStyle',
  $whiteColor: '$white',
  '@media ios': {
    container: {
      flex: 0,
      height: '$heightExtraSmall',
      paddingTop: '$heightExtraSmall / 2.5',
      marginBottom: '$heightExtraSmall',
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  '@media android': {
    container: {
      flex: 0,
      height: '$heightExtraSmall',
      marginBottom: '$heightExtraSmall',
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
  center: {
    alignItems: 'center',
  },
  size: {
    fontSize: '$deviceWidth / 9',
    marginLeft: '$marginHorizontal',
  },
});

export default styles;
