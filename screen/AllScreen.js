import React, { Component } from 'react'
import { Alert, AsyncStorage, Text, View } from 'react-native'
import Touchable from "react-native-platform-touchable"
import { SwipeListView } from 'react-native-swipe-list-view'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { withNavigation } from 'react-navigation'
import GoalInput from '../components/GoalInput'
import GoalItem from '../components/GoalItem'
import Title from "../components/Title"
import Color from "../constants/Color"
import Styles from '../constants/Styles'
import { retrieveData, storeData } from '../Functions'

class AllScreen extends Component {
    state = {
        courseGoal: [],
        pendingGoal: [],
        completeGoal: [],
    }

    componentDidMount() {
        const { navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.update()
        })
    }

    componentWillUnmount() {
        this.focusListener.remove()
    }

    update = () => {
        retrieveData('currentGoals').then(courseGoal => {
            if (courseGoal) {
                let pendingGoal = courseGoal.filter(goal => goal.pressed !== true)
                let completeGoal = courseGoal.filter(goal => goal.pressed !== false)
                this.setState({ courseGoal: '' })
                this.setState({ pendingGoal, completeGoal, courseGoal })
            } else {
                this.setState({ courseGoal: [], pendingGoal: [], completeGoal: [] })
            }
        })
    }

    addGoalHandler = (goal) => {
        if (goal !== '') {
            let { courseGoal } = this.state
            courseGoal.unshift({ id: Math.random().toString(), value: goal, pressed: false })
            this.setState({ courseGoal })
            storeData('currentGoals', courseGoal)
            this.update()
        }
    }

    updateGoal = goalId => {
        let { courseGoal } = this.state
        let objIndex = courseGoal.findIndex((obj => obj.id === goalId));
        courseGoal[objIndex].pressed = !courseGoal[objIndex].pressed
        // currentGoals = currentGoals.filter(goal => goal.id !== goalId)
        this.setState({ courseGoal })
        storeData('currentGoals', courseGoal)
        this.update()
    }

    deleteGoal = goalId => {
        let { courseGoal } = this.state
        courseGoal = courseGoal.filter(goal => goal.id !== goalId)
        this.setState({ courseGoal })
        storeData('currentGoals', courseGoal)
        this.update()
    }

    render() {
        let { courseGoal, pendingGoal, completeGoal } = this.state
        const total = Object.keys(courseGoal).length
        const pending = Object.keys(pendingGoal).length
        const completed = Object.keys(completeGoal).length
        const percentc = (completed / total).toFixed(2) * 100
        const percentp = (pending / total).toFixed(2) * 100
        return (
            <View style={Styles.container}>
                <GoalInput onAddGoal={this.addGoalHandler} />
                {!total ?
                    <Title title={'Add a Task'} /> :
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Title title={'Pending - ' + percentp.toString() + '%'} />
                        <Title title={'Completed - ' + percentc.toString() + '%'} />
                    </View>
                }
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
                        <View>
                            <Touchable
                                onPress={() => this.deleteGoal(rowData.item.id)}
                                style={Styles.rightText}
                            // background={Touchable.Ripple('blue')}
                            >
                                <Text style={Styles.rightText}>Delete</Text>
                            </Touchable>
                        </View>
                    )}
                    rightOpenValue={-90}
                    onRowOpen={(rowKey, rowMap) => {
                        setTimeout(() => {
                            rowMap[rowKey] && rowMap[rowKey].closeRow()
                        }, 2000)
                    }}
                />
                <Touchable
                    style={Styles.actionButton}
                    onPress={() => {
                        Alert.alert(
                            'Reset',
                            "Delete All tasks. This can't be undone.",
                            [
                                {
                                    text: 'Cancel',
                                },
                                {
                                    text: 'Reset', onPress: () => {
                                        AsyncStorage.removeItem("currentGoals")
                                        this.setState({ courseGoal: [], pendingGoal: [], completeGoal: [] })
                                    }
                                },
                            ],
                            { cancelable: false },
                        );
                    }}
                >
                    <Icon name="delete-outline" size={25} color={Color.themeColor} />
                </Touchable>
            </View>
        )
    }
}

export default withNavigation(AllScreen)
