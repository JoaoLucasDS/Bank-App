import React from "react"
import { ScrollView, StyleSheet, Text, View, Alert, Keyboard } from "react-native"

import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch } from 'react-redux'
import { set } from "../../store/user/index.js";

import { authenticated } from "../../services/Authentication"
import { login } from "../../services/Authentication.js"

import Button from "../../components/Button.js"
import Input from "../../components/Input"

export default function Login({ navigation }) {
    const [agency, setAgency] = React.useState('0004');
    const [checking_account, setAccount] = React.useState('3425539296');
    const [password, setPassword] = React.useState('123456');


    const dispatch = useDispatch();
    
    function validate(){
        Keyboard.dismiss();

        let valid = true;

        let missing = [];
        let error = [];

        const agencyRegex = /^[0-9]{1,4}$/g;
        
        if (!agency) {
            missing.push(" Agência");

            valid = false;
        }
        else if (!agencyRegex.test(agency)) {
            error.push(" Agência");

            valid = false;
        }
        
        const accountRegex = /^[0-9]{6,}$/g;

        if (!checking_account) {
            missing.push(" Conta");

            valid = false;
        }
        else if (!accountRegex.test(checking_account)) {
            error.push(" Conta");

            valid = false;
        }

        const passwordRegex = /^(?!.(.).\1)[0-9]+$/;

        if (!password) {
            missing.push(" Senha");

            valid = false;
        }
        else if (!passwordRegex.test(password)) {
            error.push(" Senha");

            //Alert.alert("Password", "my message");
            valid = false;
        }
        

        if (!valid){
            if (missing.length > 0){
                
                Alert.alert("Faltam Dados", "Insira:" + missing);
            }
            if (error.length > 0){
                

                Alert.alert("Dados Invalidos", "Invalidos:" + error);
            }
            return valid
        } else {
            return valid
        }
    }
    

    async function handleSignIn(){
        const userData = {
            agency,
            checking_account,
            password,
        }

        const token = await login(userData);

        if (validate()){
            if (token.status === "sucess") {
                await AsyncStorage.setItem("token", token.data);
                
                const loggedUser = await authenticated();
                
                dispatch(set(loggedUser));
                
                navigation.navigate('Home');
            } else {//CHECKTHISLATER
                switch (token) {
                    case "Request failed with status code 404":
                        Alert.alert("Error 404", "Invalid credentials");
                        break;
                    case "Request failed with status code 401":
                        Alert.alert("Error 401", "Not authorized");
                        break;
                }
            }
        }
        
    }

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            
            <View style={styles.inputs}>
                <View>
                    <Text style={styles.text}>{ "Agência" }</Text>
                    <Input 
                        keyboardType={"numeric"}
                        value={setAgency}
                        placeholder={"Insira sua agência"}/>
                    <Text style={styles.text}>{ "Conta" }</Text>
                    <Input
                        value={setAccount}
                        keyboardType={"numeric"} 
                        placeholder={"Insira sua conta"}/>
                    <Text style={styles.text}>{ "Senha" }</Text>
                    <Input
                        value={setPassword}
                        keyboardType={"numeric"}  
                        placeholder={"Insira sua senha"} 
                        password={true}/>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="Sign In" 
                            onPress={() => handleSignIn()}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Sign Up" 
                            onPress={() => navigation.navigate('Register')}/>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    text:{
        color: "black",
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: "100"
    },
    body:{
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    inputs:{
        marginTop:30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons:{
        margin:50,
    },
    button:{
        padding:8
    },
})