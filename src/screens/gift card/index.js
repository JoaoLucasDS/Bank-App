import React from "react"
import { ScrollView, StyleSheet, View, Text, Alert, Keyboard } from "react-native"
import { Picker } from "@react-native-picker/picker";

//import { getStoresList, buyGiftCard } from "../../services/Bank";
import { getStoresList, buyGiftCard } from "../../services/bank";

import { useDispatch, useSelector } from "react-redux";

import Input from "../../components/Input";
import Button from "../../components/Button";

export default function GiftCard({ navigation }) {
    const [selectedStore, setSelectedStore] = React.useState("");
    const [value, setValue] = React.useState("");
    const [stores, setStores] = React.useState([
        "Americanas",
        "Submarino",
        "Shoptime",
        "Extra",
        "Ponto Frio",
    ]);


    const userAccount = useSelector((state) => state.account);

    const dispatch = useDispatch();


    React.useEffect(() => {
        async function getStores() {
            const response = await getStoresList();

            if (response.status == "sucess") {
                setStores(response.data);
            } else {
                Alert.alert(response);
            }
        }

        getStores();
    }, []);

    function validate(){
        Keyboard.dismiss();

        let valid = true;

        let missing = [];
        let error = [];

        const valueRegex = /^[0-9]{1,}$/g;

        if (!value) {
            missing.push(" Valor");

            valid = false;
        } else if (!valueRegex.test(value)) {
            error.push(" Valor");
            
            valid = false;
        } else if (value <= 0) {
            error.push(" Valor");

            valid = false;
        } else if (value > userAccount.data.balance) {
            
            missing.push(" Saldo");

            valid = false;
        }

        if (!selectedStore) {
            missing.push(" Loja");

            valid = false;
        } 

        if (!valid){
            if (missing.length > 0){
                
                Alert.alert("Faltam Dados", "Não há:" + missing);
            }
            if (error.length > 0){
                

                Alert.alert("Dados Invalidos", "Invalidos:" + error);
            }
            return valid
        } else {
            return valid
        }
    }
    
    async function handleBuy() {
        if (validate()){
            const response = await buyGiftCard(selectedStore, value);
            //const response = "sucess";
            if (response == "sucess") {
                console.log("Aprovado " + selectedStore + " " + value);
                //const newBalance = await getBalance();

                //dispatch(updateBalance(newBalance.data));
                //Alert.alert("Comprado!", response.data);
                navigation.navigate('Home');
            } else {
                Alert.alert("Erro", response);
            }
        }
    }

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            
            <View style={styles.inputs}>
                <View>
                    <Text style={styles.text}>{ "Valor" }</Text>
                    <Input
                        value={setValue}
                        keyboardType={"numeric"}  
                        placeholder={"Insira o valor"}
                    />
                    <Text style={styles.text}>{ "Loja" }</Text>
                    <Picker
                        selectedValue={selectedStore}
                        onValueChange={(itemValue) =>
                            setSelectedStore(itemValue)
                        }
                        style={styles.picker}
                    >
                        <Picker.Item label={"Selecione uma loja"} value={null} />
                        {stores.map((store) => {
                            return (
                                <Picker.Item
                                    label={store.name}
                                    value={store.id}
                                    key={store.id}
                                />
                            );
                        })}
                    </Picker>
                </View>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <Button title="Confirm" 
                            onPress={() => handleBuy()}/>
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
        marginTop:200,
    },
    button:{
        padding:8
    },
})