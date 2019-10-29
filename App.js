import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import React, { Component } from 'react'
import { Platform, StatusBar, StyleSheet, View } from "react-native"
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Header from './components/Header'
import TabBarIcon from './components/TabBarIcon'
import Color from './constants/Color'
import AllScreen from "./screen/AllScreen"
import CompScreen from "./screen/CompScreen"
import PendScreen from "./screen/PendScreen"

const config = {
    defaultNavigationOptions: {
        headerTitle: () => <Header />,
        headerStyle: {
            backgroundColor: Color.themeColor,
            height: 60,
        },
        animationEnabled: true,
        swipeEnabled: true,
    },
}

const AllStack = createStackNavigator(
    {
        All: AllScreen,
    },
    config,
)

AllStack.navigationOptions = {
    tabBarLabel: 'All',
    tabBarIcon: ({ focused }) => (
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
    config,
)

PendStack.navigationOptions = {
    tabBarLabel: 'Pending',
    tabBarIcon: ({ focused }) => (
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
    config,
)

CompStack.navigationOptions = {
    tabBarLabel: 'Completed',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={'md-checkbox-outline'}
        />
    ),
}

CompStack.path = ''

const tabNavigator = createBottomTabNavigator(
    {
        AllStack,
        PendStack,
        CompStack,
    },
    {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'CaveatBrush',
                fontSize: 14,
            },
        }
    }
)

const AppContainer = createAppContainer(tabNavigator)

export default class App extends Component {
    state = {
        isReady: false,
    }

    async _cacheResourcesAsync() {
        const images = [require('./assets/snack-icon.png')];
        await Font.loadAsync({
            'CaveatBrush': require('./assets/fonts/CaveatBrush-Regular.ttf'),
        });

        const cacheImages = images.map(image => {
            return Asset.fromModule(image).downloadAsync();
        });
        return Promise.all(cacheImages);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._cacheResourcesAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }

        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppContainer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
