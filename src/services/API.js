import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
    baseURL: "http://68.183.143.117:3333/"
})


API.interceptors.request.use(async (config) => {
    try{
        const token = await AsyncStorage.getItem('token')

        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config
    } catch (error) {
        console.log(error)
    }
});



export default API;