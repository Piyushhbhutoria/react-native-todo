import React, { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                autoFocus
            />
            {Platform.OS === 'android' &&
                <TouchableNativeFeedback
                    style={styles.cancelButton}
                    onPress={() => inputhandler()}
                >
                    <Icon name="cancel" size={18} color="lightgrey" onPress={() => setEnteredGoal('')} />
                </TouchableNativeFeedback>
            }
            {/* <Button title="Add" onPress={() => inputhandler()} /> */}
            {Platform.OS === 'android' ?
                <TouchableNativeFeedback
                    style={styles.button}
                    onPress={() => inputhandler()}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableNativeFeedback> :
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => inputhandler()}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>}
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
    },
    button: {
        padding: 10,
        // borderRadius: 3,
        borderColor: 'black',
    },
    buttonText: {
        color: 'green',
        fontSize: 22,
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
