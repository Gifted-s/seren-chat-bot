
async function createSlackUser(User, user_slack_id, username) {
    try {
        // first check if there is an existing user with the slack id
        let user = await User.findOne({ user_slack_id });
        if (user) {
            return { alreadyExist: true, user }
        }
        // if there is no user with the slack id then create the user
        if (!user) {
            user = await User.create({ user_slack_id, username, time_added: Date.now() })
            return { alreadyExist: false, user }
        }
    } catch (error) {
        // return error message if there is an error
        return { error: error.message }
    }

}


async function dropUserCollection(User) {
    try {
        // clear users db
        await User.deleteMany({});
        return { db_cleared: true }
    } catch (error) {
        // return error message if there is an error
        return { error: error.message }
    }

}


module.exports = {
    createSlackUser, dropUserCollection
}