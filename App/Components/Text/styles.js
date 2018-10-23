import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  headerRow: {
    flex: 1,
    flexDirection: 'row',
  },
  white: {
    color: '$white',
  },
  titleSecond: {
    flex: 2,
    alignItems: 'flex-end',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: '$textSize',
    color: '$textColor',
  },
});

export default styles;
