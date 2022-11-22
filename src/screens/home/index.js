import React from "react"
import { StyleSheet, View, Text, FlatList, Dimensions} from "react-native"

import { authenticated } from "../../services/Authentication"
import { useSelector } from 'react-redux'

import ButtonCard from "../../components/ButtonCard"

import Header from "./components/Header"

import options from "../../mocks/options"


const width = Dimensions.get('window').width

export default function Home({navigation}) {
    const account = useSelector((state) => state.account.data);



    React.useEffect(() => {
        async function trigger() {
            authenticated();
            
        }

        trigger();
    }, []);


    return (
        <>
            <FlatList style={styles.body}
                data={options.itens} 
                renderItem={({ item }) => (
                   < ButtonCard 
                    title={item.name} 
                    icon={item.icon}
                    onPress={() => navigation.navigate(item.route)}/>
                )}
                contentContainerStyle={styles.list} 
                keyExtrator={({name}) => name}

                ListHeaderComponent={()=>{
                    return <>
                        
                        <Header 
                            //name = {(account.client.name).slice(0, 10) + "..."} 
                            name = {account.client.name}
                            balance = {account.balance.toFixed(2)} 
                            agency = {account.agency.number} 
                            account = {account.account_number}
                        />
                    </>
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    body:{

        backgroundColor: "#ddd",
    },
    list:{

        alignSelf: 'center',
        alignItems: 'center',
        
    },
})