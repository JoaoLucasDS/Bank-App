import React from 'react'
import { StyleSheet, Pressable } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ButtonRound({ onPress, icon }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Icon
        name={icon}
        style={{color: "white", fontSize: 30}}
      />
    </Pressable>
  );
}



const styles = StyleSheet.create({
  button: {
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor:"black",
    borderRadius:100,

    marginHorizontal:10,
  }
})