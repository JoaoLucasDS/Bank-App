import React from "react"
import { ScrollView, StyleSheet, View, Text, Alert, Keyboard } from "react-native"
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';

import Button from "../../components/Button.js"
import Input from "../../components/Input"
import ButtonDate from "../../components/ButtonDate.js"

import { openAccount } from "../../services/User.js";

export default function Register({ navigation }) {
    const [name, setName] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

    const [birthDate, setBirthDate] = React.useState(new Date(2030, 10, 20));
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;

        setBirthDate(currentDate);
    };
    
    const showMode = (currentMode) => {

        DateTimePickerAndroid.open({
            value: birthDate,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });

        
    };
    
    const showDatepicker = () => {
        showMode('date');
    };
    
    function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }

    
    function validate(){
        Keyboard.dismiss();

        let valid = true;

        let missing = [];
        let error = [];

        const nameRegex = /^[a-záàâãéèêíïóôõöúçñ]+([\ a-záàâãéèêíïóôõöúçñ]+$)/gi;
        
        if (!name) {
            missing.push(" Nome");

            valid = false;
        }
        else if (!nameRegex.test(name)) {
            error.push(" Nome");

            valid = false;
        }
        
        const cpfRegex = /^[0-9]{11}$/g;

        if (!cpf) {
            missing.push(" CPF");

            valid = false;
        }
        else if (!cpfRegex.test(cpf)) {
            error.push(" CPF");

            valid = false;
        }

        const passwordRegex = /^(?!.(.).\1)[0-9]+$/;

        if (!password) {
            missing.push(" Senha");

            valid = false;
        }
        else if (!passwordRegex.test(password)) {
            error.push(" Senha");

            valid = false;
        } else if (!confirmPassword) {
            missing.push(" Confirmação");

            valid = false;
        } else if (password !== confirmPassword) {
            error.push(" Confirmação");
            console.log("aq")
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
            name,
            cpf,
            email,
            password,

            birth_date: "1999-01-01",
        }

        console.log(userData);

        if (validate()){
            const response =  await openAccount(userData);

            if (response.status == "sucess") {
                Alert.alert("Sucesso!", response.data.message);
                navigation.navigate('Login');
            } else {
                Alert.alert("Erro", "Conta não foi criada.\n" + response);
            }
        }
    }

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            
            <View style={styles.inputs}>
                <View>
                    <Text style={styles.text}>{ "Nome" }</Text>
                    <Input 
                        value={setName}
                        placeholder={"Insira seu nome"}/>
                    <Text style={styles.text}>{ "CPF" }</Text>
                    <Input
                        keyboardType={"numeric"}
                        value={setCpf} 
                        placeholder={"Insira seu CPF"}/>
                    <Text style={styles.text}>{ "Email" }</Text>
                    <Input
                        value={setEmail} 
                        placeholder={"Insira seu email"}/>
                    <Text style={styles.text}>{ "Senha" }</Text>
                    <Input
                        keyboardType={"numeric"}
                        value={setPassword}  
                        placeholder={"Insira uma senha"} 
                        password={true}/>
                    <Text style={styles.text}>{ "Confirme a senha" }</Text>
                    <Input
                        keyboardType={"numeric"}
                        value={setConfirmPassword}  
                        placeholder={"Insira uma senha"} 
                        password={true}/>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="Confirm" 
                            onPress={() => handleSignIn()}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Cancel" 
                            onPress={() => navigation.navigate('Login')}/>
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
        margin:10,
    },
    button:{
        padding:8
    },
})