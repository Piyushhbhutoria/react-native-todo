import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Touchable from "react-native-platform-touchable";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Color from '../constants/Color';

const GoalInput = props => {
    const [enteredGoal, setEnteredGoal] = useState('')
    const inputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
    }

    function inputhandler() {
        props.onAddGoal(enteredGoal)
        setEnteredGoal('')
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Goals"
                style={styles.inputArea}
                onChangeText={inputHandler}
                value={enteredGoal}
                clearButtonMode='while-editing'
                allowFontScaling
            />
            {Platform.OS === 'android' &&
                <TouchableNativeFeedback
                    style={styles.cancelButton}
                    onPress={() => inputhandler()}
                >
                    <Icon name="cancel" size={18} color="lightgrey" onPress={() => setEnteredGoal('')} />
                </TouchableNativeFeedback>
            }
            <Touchable
                style={styles.button}
                onPress={() => inputhandler()}
            >
                <Text style={styles.buttonText}>Add</Text>
            </Touchable>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 2.5,
        marginHorizontal: 10,
    },
    inputArea: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '70%',
        fontSize: 18,
        lineHeight: 22,
        margin: 10,
        fontFamily: 'CaveatBrush',
    },
    button: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5,
        borderColor: Color.tintColor,
        borderWidth: 1,
    },
    buttonText: {
        color: Color.tintColor,
        fontSize: 22,
        fontFamily: 'CaveatBrush',
    },
    cancelButton: {
        height: 18,
        width: 18,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default GoalInput
