import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Counter = ({title, count}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{`${title}: ${count}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 24,
  },
});

export default Counter;
