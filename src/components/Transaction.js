import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Transaction({ value, type, date }) {
  return (
    <View style={styles.button}>
      <View>
        <Text style={styles.type}>{ type[0].toUpperCase() + type.substring(1) }</Text>
        <Text style={styles.date}>{ date }</Text>
      </View>
      
      
      <Text style={styles.value}>{ value }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width:350,
    height:85,

    alignItems: "center",

    flexDirection: "row",


    borderRadius: 10,
    backgroundColor: "#fff",

    paddingHorizontal:30,
    marginTop:25,

    justifyContent:"space-between",
  },

  type: {
    fontFamily: "Roboto",
    fontSize: 25,


    color: '#black',
  },
  date: {
    fontFamily: "Roboto",
    fontSize: 13,
    lineHeight: 16,

    color: '#black',
  },
  value: {
    fontFamily: "Roboto",
    fontSize: 25,


    color: '#black',
  },
  
});