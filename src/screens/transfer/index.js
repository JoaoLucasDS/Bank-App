import React from "react"
import { ScrollView, StyleSheet, View, Text, Alert, Keyboard } from "react-native"

import { makeTransference, getBalance } from "../../services/User";
import { updateBalance, set } from "../../store/user";
import { authenticated } from "../../services/Authentication"

import Input from "../../components/Input"
import Button from "../../components/Button";

import { useSelector, useDispatch } from "react-redux";

export default function Transfer({ navigation }) {
    const userAccount = useSelector((state) => state.account.data);
    const dispatch = useDispatch();

    const [receiverAgency, setAgency] = React.useState('0003');
    const [receiverAccount, setAccount] = React.useState('338479'); //123456
    const [value, setValue] = React.useState('');

    function validate(){
        Keyboard.dismiss();

        let valid = true;

        let missing = [];
        let error = [];

        const agencyRegex = /^[0-9]{1,4}$/g;
        
        if (!receiverAgency) {
            missing.push(" Agência");

            valid = false;
        }
        else if (!agencyRegex.test(receiverAgency)) {
            error.push(" Agência");

            valid = false;
        }
        
        const accountRegex = /^[0-9]{6,}$/g;

        if (!receiverAccount) {
            missing.push(" Conta");

            valid = false;
        }
        else if (!accountRegex.test(receiverAccount)) {
            error.push(" Conta");

            valid = false;
        }

        const valueRegex = /^[0-9]{1,}$/g;

        if (!value) {
            missing.push(" Valor");

            valid = false;
        } else if (value > userAccount.balance) {
            missing.push(" Saldo");

            valid = false;
        } else if (!valueRegex.test(value)) {
            error.push(" Valor");

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

    async function handleTransfer() {
        const receiverData = {
            destiny_agency_number: receiverAgency,
            destiny_account_number: receiverAccount,
            value: value,
        }
        console.log(receiverData);

        

        if (validate()){
            const response = await makeTransference(receiverData);

            if (response == "sucess") {
                const newBalance = await getBalance();

                //CHECKARISSO
                dispatch(updateBalance(newBalance.data));

                const loggedUser = await authenticated();
                dispatch(set(loggedUser));
                console.log(newBalance)
                console.log(userAccount.balance)
                Alert.alert("Transferido", ("Não há:" + value + "enviado para a conta" + receiverAccount));
                navigation.navigate('Home');
            } else {
                Alert.alert("Erro", response);
            }
        }
    }
    
    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <Text style={styles.title}>{ "Pra quem deseja transferir?" }</Text>
            <View style={styles.inputs}>
                
                <View>
                    <Text style={styles.text}>{ "Agência" }</Text>
                    <Input 
                        keyboardType={"numeric"}
                        value={setAgency}
                        placeholder={"Insira a agência"}/>
                    <Text style={styles.text}>{ "Conta" }</Text>
                    <Input
                        value={setAccount}
                        keyboardType={"numeric"} 
                        placeholder={"Insira a conta"}/>
                    <Text style={styles.text}>{ "Valor" }</Text>
                    <Input
                        value={setValue}
                        keyboardType={"numeric"}  
                        placeholder={"Insira o valor"}/>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="Confirm" 
                            onPress={() => handleTransfer()}/>
                    </View>
                    <View style={styles.button}>
                        <Button title="Cancel" 
                            onPress={() => navigation.navigate('Home')}/>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    title:{
        color: "black",
        fontSize: 30,

        fontWeight: "400",
        padding:20
    },
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
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttons:{
        margin:15,
    },
    button:{
        padding:8
    },

})