import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.heading}>TO-DO</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        justifyContent: 'flex-end',
        // backgroundColor: '#229fab',
    },
    heading: {
        textAlign: "center",
        fontSize: 42,
        lineHeight: 48,
    }
})
