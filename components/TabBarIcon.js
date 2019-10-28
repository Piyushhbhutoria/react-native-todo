import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Color from '../constants/Color'


export default function TabBarIcon(props) {
    return (
        <Icon
            name={props.name}
            size={30}
            // style={{fontSize:30}}
            color={props.focused ? Color.tabIconSelected : Color.tabIconDefault}
        />
    )
}
