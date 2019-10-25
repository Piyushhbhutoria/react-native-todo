import React, { Component } from 'react'
import { AsyncStorage, Platform, StyleSheet, Text, View } from 'react-native'
import { TouchableNativeFeedback, TouchableOpacity } from 'react-native-gesture-handler'
import { SwipeListView } from 'react-native-swipe-list-view'
import { withNavigation } from 'react-navigation'
import GoalItem from '../components/GoalItem'
import Header from "../components/Header"
import Title from "../components/Title"

class CompScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            courseGoal: [],
            completeGoal: []
        }
    }

    componentDidMount() {
        const { navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.update()
        })
    }

    update = () => {
        this.retrieveData().then(res => {
            currentGoals = this.state.courseGoal
            currentGoals = currentGoals.filter(goal => goal.pressed !== false)
            this.setState({ completeGoal: currentGoals })
        })
    }

    componentWillUnmount() {
        this.focusListener.remove()
    }

    updateGoal = goalId => {
        currentGoals = this.state.courseGoal
        objIndex = currentGoals.findIndex((obj => obj.id == goalId));
        currentGoals[objIndex].pressed = !currentGoals[objIndex].pressed
        // currentGoals = currentGoals.filter(goal => goal.id !== goalId)
        this.setState({ courseGoal: currentGoals })
        this.storeData(currentGoals)
        this.update()
    }

    deleteGoal = goalId => {
        currentGoals = this.state.courseGoal
        objIndex = currentGoals.findIndex((obj => obj.id == goalId));
        currentGoals = currentGoals.filter(goal => goal.id !== goalId)
        this.setState({ courseGoal: currentGoals })
        this.storeData(currentGoals)
        this.update()
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
                <Title title={'Completed - ' + (Object.keys(this.state.completeGoal).length / Object.keys(this.state.courseGoal).length).toFixed(2) * 100 + '%'} />
                <SwipeListView
                    useFlatList={true}
                    keyExtractor={item => item.id}
                    data={this.state.completeGoal}
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

CompScreen.navigationOptions = {
    header: null,
}

export default withNavigation(CompScreen)
