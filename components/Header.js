import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Today's Task</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
    },
    text: {
        // fontWeight: 'bold',
        fontFamily: 'CaveatBrush',
        fontSize: 43,
        color: '#fff',
    },
});

export default Header
