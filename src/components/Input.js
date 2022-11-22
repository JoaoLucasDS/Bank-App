import react from 'react'; 
import {Platform, TextInput, View, StyleSheet } from 'react-native'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Input({ password = false, placeholder, value, ...props }) {   
  const [hidePassword, setHidePassword] = react.useState(password);
  const [focus, setFocus] = react.useState(false);

  
  return (
    <View style = { focus ? [styles.container, styles.focus] : styles.container}>
      <TextInput
      {...props}
      style={styles.input}

      placeholder={placeholder}
      secureTextEntry={hidePassword ? true : false}
      
      onChangeText={value}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      /> 
      {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            style={{color: "black", fontSize: 22, marginEnd: 15 }}
          />
        )}  
    </View>
    
  ); 
}

const styles = StyleSheet.create({
  container:{
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",

    width: 350,

    backgroundColor: "#eee",
    borderRadius: 5,
    marginVertical: 10,
  },
  focus:{
    backgroundColor: "#ddd",
    borderColor: "black",
  },
  input: {
    height: 50,
    width: 300,
    marginStart: 20,

    borderRadius: 5,

    color: "black",
    placeholderTextColor:"#000" 
  },
});