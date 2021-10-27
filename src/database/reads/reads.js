async function getUserResponse(User, user_slack_id) {
    try {
        const user_responses = await User.findOne({ user_slack_id })
        return user_responses
    } catch (error) {
        return { error: error.message }
    }
}

async function getUsers(User) {
    try {
        const users = await User.find({})
        return users
    } catch (error) {
        return { error: error.message }
    }
}


module.exports = {
    getUserResponse,
    getUsers
}