import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Card = ({alphapet, isActive, isMatched}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isMatched ? 'white' : 'red'},
      ]}>
      {isActive ? <Text style={styles.alphapet}>{alphapet}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alphapet: {
    color: 'white',
    fontSize: 32,
  },
});

export default memo(Card);
