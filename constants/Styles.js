import { StyleSheet } from 'react-native';
import Color from "./Color";

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    rightText: {
        padding: 12,
        backgroundColor: 'red',
        color: 'white',
        alignItems: 'flex-end',
        fontSize: 20,
        fontFamily: 'CaveatBrush',
    },
    actionButton: {
        borderWidth: 1,
        borderColor: Color.themeColor,
        alignItems: 'center',
        justifyContent: 'center',
        width: 43,
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 43,
        backgroundColor: '#fff',
        borderRadius: 100,
    }
})
