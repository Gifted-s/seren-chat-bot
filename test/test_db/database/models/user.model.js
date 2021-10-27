const mongoose_test_instance = require("../connection/connect.db")

const UserSchema = new mongoose_test_instance .Schema({
    username: {
        type: String,
        required: true
    },
    feeling: {
        type: String,
        required: false
    },
    user_slack_id: {
        type: String,
        required: true
    },
    hobbies: [{
        type: String,
        required: false
    },
    { _id: false }],
})
const User = mongoose_test_instance.model('User', UserSchema);

module.exports= User;