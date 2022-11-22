import react from "react"
import { View, Alert, StyleSheet, Dimensions, Text } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";

import ButtonRound from "../../../components/ButtonRound"

import { userLogout } from "../../../services/User"
import { logout } from "../../../store/user/index.js";

import { useDispatch } from 'react-redux'

import { useNavigation } from '@react-navigation/native';


const width = Dimensions.get('screen').width

export default function Header({ name = "Nome", balance = 0, agency = "0000", account = "0000000000", }) {
    const dispatch = useDispatch();

    const navigation = useNavigation();
    
    name = name.split(" ");
    let firstName = name[0];
    let lastName = name[name.length - 1];

    async function handleLogout() {
        const response = await userLogout();
        console.log(response)

        if (response == "sucess") {
            //CHECKTHIS
            //dispatch(logout());
            await AsyncStorage.clear();

            navigation.navigate("Login");
        }
    }

    return(
        <>              
            <View style={styles.header}>
                <View style={{flexDirection: "row", alignItems: 'center'}}>
                    <ButtonRound 
                        icon="account"
                        onPress={() => Alert.alert(
                            "Opções",
                            "Deseja Sair?",
                            [
                                {
                                    text: "Não",
                                },
                                {
                                    text: "Sim",
                                    onPress: () => handleLogout(),
                                    style: "cancel",
                                },
                            ],
                    )}/>
                    <View>
                        <Text style={styles.firstName}>{firstName}</Text>
                        <Text style={styles.lastName}>{lastName}</Text>
                    </View>
                </View>
                <Text style={styles.balance}>{ "R$ " + balance}</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.info}>{"Agência: " + agency + " | " + "Conta: " + account}</Text>
            </View>
        </>
    )

}

const styles = StyleSheet.create({
    header:{
        
        width: width,
        height:  70,
        backgroundColor: "white",

        justifyContent:"space-between",
        
        flexDirection: "row",
        alignItems: 'center',

        paddingHorizontal: 15,
        paddingVertical: 0
    },
    footer:{

        height:  40,
        backgroundColor: "white",
        
        flexDirection: "row",
        alignItems: 'center',

        paddingHorizontal: 15,
        paddingVertical: 0
    },
    balance:{
        fontSize: 25,



        color: 'black',
        fontWeight: '300',
        padding: 10,
    },
    firstName:{
        fontSize: 25,

        color: 'black',
        fontWeight: '400',

    },
    lastName:{
        fontSize: 13,

        color: 'black',
        fontWeight: '400',

    },
    info:{
        fontSize: 15,

        color: 'black',
        fontWeight: '500',
        padding: 10,
    },
})