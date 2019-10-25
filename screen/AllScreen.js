import React, { Component } from 'react'
import { AsyncStorage, StyleSheet, Text, View, Platform } from 'react-native'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler'
import { SwipeListView } from 'react-native-swipe-list-view'
import { withNavigation } from 'react-navigation'
import GoalInput from '../components/GoalInput'
import GoalItem from '../components/GoalItem'
import Header from "../components/Header"

class AllScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            courseGoal: [],
        }
    }

    componentDidMount() {
        const { navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.retrieveData()
        })
    }

    componentWillUnmount() {
        this.focusListener.remove()
    }

    addGoalHandler = (goal) => {
        if (goal !== '') {
            currentGoals = this.state.courseGoal
            currentGoals.push({ id: Math.random().toString(), value: goal, pressed: false })
            this.setState({ courseGoal: currentGoals })
            this.storeData(this.state.courseGoal)
        }
    }

    updateGoal = goalId => {
        currentGoals = this.state.courseGoal
        objIndex = currentGoals.findIndex((obj => obj.id == goalId));
        currentGoals[objIndex].pressed = !currentGoals[objIndex].pressed
        this.setState({ courseGoal: currentGoals })
        this.storeData(currentGoals)
    }

    deleteGoal = goalId => {
        currentGoals = this.state.courseGoal
        objIndex = currentGoals.findIndex((obj => obj.id == goalId));
        currentGoals = currentGoals.filter(goal => goal.id !== goalId)
        this.setState({ courseGoal: currentGoals })
        this.storeData(currentGoals)
    }

    storeData = async (courseGoal) => {
        try {
            await AsyncStorage.setItem('currentGoals', JSON.stringify(courseGoal))
            // this.retrieveData()
        } catch (e) {
            console.log('error storing data ', e)
        }
    }

    retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('currentGoals')
            if (value !== null) {
                this.setState({ courseGoal: JSON.parse(value) })
                // console.log(JSON.parse(value))
            }
        } catch (e) {
            console.log('error retriving data ', e)
        }
    }

    render() {
        // console.log(Object.values(this.state.courseGoal))
        return (
            <View style={styles.container} >
                <Header />
                <GoalInput onAddGoal={this.addGoalHandler} />
                <SwipeListView
                    useFlatList={true}
                    keyExtractor={item => item.id}
                    data={this.state.courseGoal}
                    renderItem={(rowData, rowMap) => {
                        return (
                            <View>
                                <GoalItem
                                    id={rowData.item.id}
                                    title={rowData.item.value}
                                    pressed={rowData.item.pressed}
                                    onUpdate={this.updateGoal}
                                />
                            </View>
                        )
                    }}
                    renderHiddenItem={(rowData, rowMap) => (
                        <View style={styles.rowBack}>
                            {Platform.OS === 'android' ?
                                <TouchableNativeFeedback
                                    style={[styles.rightText]}
                                    onPress={() => this.deleteGoal(rowData.item.id)}
                                >
                                    <Text style={styles.rightText}>Delete</Text>
                                </TouchableNativeFeedback> :
                                <TouchableOpacity
                                    style={[styles.rightText]}
                                    onPress={() => this.deleteGoal(rowData.item.id)}
                                >
                                    <Text style={styles.rightText}>Delete</Text>
                                </TouchableOpacity>}
                        </View>
                    )}
                    rightOpenValue={-90}
                    onRowOpen={(rowKey, rowMap) => {
                        setTimeout(() => {
                            rowMap[rowKey] && rowMap[rowKey].closeRow()
                        }, 2000)
                    }}
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
    },
    rightText: {
        padding: 12,
        backgroundColor: 'red',
        color: 'white',
        alignItems: 'flex-end',
        fontSize: 20,
    },
})

AllScreen.navigationOptions = {
    header: null,
}

export default withNavigation(AllScreen)
