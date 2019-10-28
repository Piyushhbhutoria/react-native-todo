import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Touchable from "react-native-platform-touchable";
import RadioButton from './RadioButton';

const GoalItem = props => {
    const [isPressed, setIsPressed] = useState(props.pressed)

    function pressing() {
        props.onUpdate(props.id)
        setIsPressed(!isPressed)
    }

    return (
        <View style={styles.listConstainer}>
            <View style={styles.listItem}>
                <Text style={[styles.text, isPressed && styles.titleText]}>{props.title}</Text>
            </View>
            <Touchable
                style={styles.button}
                onPress={() => pressing()}
            >
                <RadioButton style={isPressed && styles.radio} selected={isPressed} />
            </Touchable>
        </View>
    )
}

const styles = StyleSheet.create({
    listConstainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        // margin: 12,
        backgroundColor: 'white',
        borderColor: 'grey',
        borderBottomWidth: 1,
    },
    listItem: {
        padding: 7,
        marginVertical: 3,
        width: '70%',
    },
    button: {
        padding: 10,
    },
    radio: {
        borderColor: 'lightgrey'
    },
    text: {
        fontSize: 18,
        paddingHorizontal: 10,
        fontFamily: 'CaveatBrush',
    },
    titleText: {
        textDecorationLine: 'line-through',
        color: 'lightgrey',
        fontFamily: 'CaveatBrush',
    }
});

export default GoalItem;
