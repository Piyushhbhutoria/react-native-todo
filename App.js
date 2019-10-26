import React from 'react'
import {StyleSheet, View, Platform, StatusBar} from "react-native"
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import TabBarIcon from './components/TabBarIcon'
import AllScreen from "./screen/AllScreen"
import CompScreen from "./screen/CompScreen"
import PendScreen from "./screen/PendScreen"

const AllStack = createStackNavigator(
    {
        All: AllScreen,
    },
)

AllStack.navigationOptions = {
    tabBarLabel: 'All',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'ios-list'}
        />
    ),
}

AllStack.path = ''

const PendStack = createStackNavigator(
    {
        Pending: PendScreen,
    },
)

PendStack.navigationOptions = {
    tabBarLabel: 'Pending',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'ios-stats'}
        />
    ),
}

PendStack.path = ''

const CompStack = createStackNavigator(
    {
        Completed: CompScreen,
    },
)

CompStack.navigationOptions = {
    tabBarLabel: 'Completed',
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'md-checkbox-outline'}
        />
    ),
}

CompStack.path = ''

const tabNavigator = createBottomTabNavigator({
    AllStack,
    PendStack,
    CompStack,
})

const AppContainer = createAppContainer(tabNavigator)

export default function App(porps) {
    return (
        <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
            <AppContainer/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
