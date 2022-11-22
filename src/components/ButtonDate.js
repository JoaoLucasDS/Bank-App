import react from 'react'; 
import { Pressable, Text, StyleSheet } from 'react-native'


export default function ButtonDate({ onPress, Date }) {   

  return (
    <Pressable style = { styles.container } onPress={onPress}>
      <Text style={styles.text}>{ Date }</Text>
    </Pressable>
    
  ); 
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",

    width: 350,
    height: 50,

    backgroundColor: "#eee",
    borderRadius: 5,
    marginVertical: 10,
  },

  text: {
    fontFamily: "Roboto",
    fontSize: 14,

    color: 'black',
    marginStart: 20,
  },
});