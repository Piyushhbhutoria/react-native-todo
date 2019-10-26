import React from 'react';
import {StyleSheet, View} from 'react-native';

const RadioButton = props => {
    return (
        <View style={[{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: '#000',
            alignItems: 'center',
            justifyContent: 'center',
        }, props.style]}>
            {
                props.selected ?
                    <View style={{
                        height: 13,
                        width: 13,
                        borderRadius: 6,
                        backgroundColor: 'lightgrey',
                    }}/>
                    : null
            }
        </View>
    );
}

const styles = StyleSheet.create({});

export default RadioButton
