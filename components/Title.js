import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function Title(props) {
    return (
        <View style={styles.header}>
            <Text style={styles.heading}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 40,
        justifyContent: 'flex-end',
        // backgroundColor: 'pink'
    },
    heading: {
        textAlign: "center",
        fontSize: 24,
        lineHeight: 32,
    }
})
