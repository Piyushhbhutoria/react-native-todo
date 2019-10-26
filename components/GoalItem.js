import React, {useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {TouchableNativeFeedback, TouchableOpacity} from 'react-native-gesture-handler';
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
            {Platform.OS === 'android' ?
                <TouchableNativeFeedback
                    style={styles.button}
                    onPress={() => pressing()}
                    useForeground
                >
                    <RadioButton style={isPressed && styles.radio} selected={isPressed}/>
                </TouchableNativeFeedback> :
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => pressing()}
                >
                    <RadioButton style={isPressed && styles.radio} selected={isPressed}/>
                </TouchableOpacity>}
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
        fontSize: 20,
        paddingHorizontal: 10,
    },
    titleText: {
        textDecorationLine: 'line-through',
        color: 'lightgrey',
    }
});

export default GoalItem;
