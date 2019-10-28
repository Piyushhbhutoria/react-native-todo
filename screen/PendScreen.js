import React, { Component } from 'react'
import { Alert, AsyncStorage, Text, View } from 'react-native'
import Touchable from "react-native-platform-touchable"
import { SwipeListView } from 'react-native-swipe-list-view'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { withNavigation } from 'react-navigation'
import GoalItem from '../components/GoalItem'
import Title from "../components/Title"
import Color from "../constants/Color"
import Styles from '../constants/Styles'
import { retrieveData, storeData } from '../Functions'

class PendScreen extends Component {
    state = {
        courseGoal: [],
        pendingGoal: []
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
                this.setState({ pendingGoal, courseGoal })
            } else {
                this.setState({ courseGoal: [], pendingGoal: [] })
            }
        })
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
        // console.log(Object.values(this.state.courseGoal))
        const pending = Object.keys(this.state.pendingGoal).length
        const total = Object.keys(this.state.courseGoal).length
        const percent = (pending / total).toFixed(2) * 100
        return (
            <View style={Styles.container}>
                <Title title={total ? 'Pending - ' + percent.toString() + '%' : 'No Task Pending'} />
                <SwipeListView
                    useFlatList={true}
                    keyExtractor={item => item.id}
                    data={this.state.pendingGoal}
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
                                        this.setState({ courseGoal: [], pendingGoal: [] })
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

export default withNavigation(PendScreen)
