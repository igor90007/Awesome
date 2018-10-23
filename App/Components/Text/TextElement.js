import React from 'react';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';

import styles from './styles';

const TextElement = ({ text, containerStyles, textStyles }) => {
  const viewStyle = containerStyles ? [containerStyles] : [styles.container];

  const textStyle = [styles.text];
  const stub = textStyles ? textStyle.push(textStyles) : null;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

TextElement.propTypes = {
  text: PropTypes.string,
  containerStyles: PropTypes.any,
  textStyles: PropTypes.any,
};

export default TextElement;
