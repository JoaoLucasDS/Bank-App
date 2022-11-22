import React from "react"
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../login';
import Register from '../register';
import Home from '../home'
import Transfer from '../transfer'
import GiftCard from '../gift card'
import BankStatement from "../bank statement";


const Stack = createStackNavigator();

const StackScreen = ({navigation}) => (
    <Stack.Navigator initialRouteName="Login">
        <Stack.Group
            screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0
                },
                headerTitleStyle: {
                    fontFamily: "Roboto",
                    fontSize: 25, 
                    fontWeight: "bold"
                }
            }}
            
        >   
            <Stack.Screen options={{
                headerLeft: ()=> null,
            }} name="Home" component={Home}/>
            <Stack.Screen options={{
                title: "Extrato"
            }} name="BankStatement" component={BankStatement}/>
            <Stack.Screen options={{
                title: "Gift Cards"
            }} name="GiftCard" component={GiftCard}/>
            <Stack.Screen options={{
                title: "Transferência"
            }} name="Transfer" component={Transfer}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen options={{
                title: "Registro"
            }} name="Register" component={Register}/>
        </Stack.Group>
        
        
    </Stack.Navigator>
);

export default StackScreen