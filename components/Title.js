import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Title(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.heading}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 30,
        justifyContent: 'center',
    },
    heading: {
        textAlign: "center",
        fontSize: 22,
        fontFamily: 'CaveatBrush',
    }
})
