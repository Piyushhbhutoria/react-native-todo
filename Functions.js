import { AsyncStorage } from "react-native";

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.log('error storing data ', e)
    }
}

export const retrieveData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return JSON.parse(value)
    } catch (e) {
        console.log('error retriving data ', e)
    }
}
