removeGoal = (currentGoals,goalId) => {
    currentGoals = this.state.courseGoal
    objIndex = currentGoals.findIndex((obj => obj.id == goalId));
    currentGoals[objIndex].pressed = !currentGoals[objIndex].pressed
    // currentGoals = currentGoals.filter(goal => goal.id !== goalId)
    this.setState({ courseGoal: currentGoals })
    this.storeData(currentGoals)
}

export default Functions = {
    removeGoal
}
