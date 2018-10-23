import React from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

import { TextElement } from './';

import styles from './styles';

const Title = ({ props, state }) => {
  if (props.title) {
    return props.title;
  } else if (state && state.title) {
    return state.titleSecond ? (
      <View style={styles.headerRow}>
        <TextElement text={state.title} textStyles={styles.white} />
        <TextElement
          text={state.titleSecond}
          containerStyles={styles.titleSecond}
          textStyles={styles.white}
        />
      </View>
    ) : <TextElement text={state.title} />;
  }
  return null;
};

Title.propTypes = {
  props: PropTypes.object,
  state: PropTypes.object,
  title: PropTypes.any,
};

export default Title;
