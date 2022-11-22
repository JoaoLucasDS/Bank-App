import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

export default function Button({ onPress, title, color = "black" , textColor = "white"}) {
  return (
    <Pressable style={[styles.button, {backgroundColor: color}]} onPress={onPress}>
      <Text style={[styles.text, {color: textColor}]}>{ title }</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width:164,
    height:48,

    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    

    marginHorizontal:15,
    
  },

  text: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
  },
});