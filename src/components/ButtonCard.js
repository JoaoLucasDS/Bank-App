import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ButtonCard({ onPress, title, icon }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Icon
            name={icon}
            style={{color: "black", fontSize: 40, marginRight: 10 }}
          />
      <Text style={styles.text}>{ title }</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width:350,
    height:85,

    alignItems: "center",

    flexDirection: "row",


    borderRadius: 10,
    backgroundColor: "white",

    paddingHorizontal:30,
    marginTop:25,
  },

  text: {
    fontFamily: "Roboto",
    fontSize: 20,
    lineHeight: 20,

    color: 'black',
  },
});