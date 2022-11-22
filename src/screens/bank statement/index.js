import React from "react"
import { FlatList, StyleSheet, View, Alert, Keyboard, Text } from "react-native"

import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import moment from 'moment'

import Button from "../../components/Button.js"
import Transaction from "../../components/Transaction.js";

import { getTransactions } from "../../services/User.js";

export default function BankStatement({ navigation }) {
    const [initialDate, setInitialDate] = React.useState(new Date(1999, 11, 31));
    const [finalDate, setFinalDate] = React.useState(moment().toDate());
    
    const [transactions, setTransactions] = React.useState('');

    const showMode = (currentMode, whichDate) => {

        if (whichDate === initialDate) {
            const onChange = (event, selectedDate) => {
                const currentDate = selectedDate;
                
                setInitialDate(currentDate);
            };

            DateTimePickerAndroid.open({
                value: initialDate,
                onChange,
                mode: currentMode,
                is24Hour: true,
            });
        } else {
            const onChange = (event, selectedDate) => {
                const currentDate = selectedDate;

                setFinalDate(currentDate); 
            };

            DateTimePickerAndroid.open({
                value: finalDate,
                onChange,
                mode: currentMode,
                is24Hour: true,
            });
        }

        
    };
    
    const showDatepicker = whichDate => (event) => {
        showMode('date',whichDate);
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

        
        if (!initialDate) {
            missing.push(" Data Inicial");

            valid = false;
        }

        if (!finalDate) {
            missing.push(" Data Final");

            valid = false;
        }

        

        if (!valid){
            console.log(missing);
            console.log(error);
            if (missing.length > 0){
                
                Alert.alert("Faltam Dados", "Insira: " + missing);
            }
            if (error.length > 0){
                
                Alert.alert("Dados Invalidos", error);
            }
            return valid
        } else {
            return valid
        }
    }

    async function statement() {
        if (initialDate.getTime() > finalDate.getTime()) {
            Alert.alert("Erro na busca", "A data incial deve ser inferior a data final")
        } else if (validate()){
            const response = await getTransactions(
                formatDate(initialDate),
                formatDate(finalDate)
            );

            if (response.status == "sucess") {
                setTransactions(response.data);
            } else {
                Alert.alert("Erro na busca", "Tente novamente mais tarde");
            }
        }
    }

    return (
        <>
            <View style={styles.inputs}>
                <View style={{flexDirection: "row", alignItems: 'center'}}>
                    <View style={styles.text}>
                        <Text>{"Data incial"}</Text>
                        <Button onPress={showDatepicker(initialDate)} title={formatDate(initialDate)} />
                    </View>
                    <View style={styles.text}>
                        <Text>{"Data Final"}</Text>
                        <Button onPress={showDatepicker(finalDate)} title={formatDate(finalDate)} />
                    </View>
                    
                    
                </View>
            </View>
            <FlatList style={styles.body}
                data={transactions} 
                renderItem={(transactions) => (
                    <Transaction
                        value={transactions.item.value}
                        type={transactions.item.type} 
                        date={transactions.item.date}  

                    />
                )}
                contentContainerStyle={styles.list} 
                keyExtrator={(transactions) => transactions.id}

            />
            <View style={styles.footer}>
                <Button onPress={statement} title={"Procurar"} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    text:{
        color: "black",

        alignItems: 'center'
    },
    body:{
        backgroundColor: '#ddd'
    },
    inputs:{
        marginTop:5,
        marginBottom:10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer:{
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'white'
    },
    list:{
        alignSelf: 'center',
        alignItems: 'center',

    },
})