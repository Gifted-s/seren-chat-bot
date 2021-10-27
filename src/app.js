require('dotenv').config()
const { App, ExpressReceiver } = require("@slack/bolt");
const sendErrorResponse = require('./helpers/bot_downtime_error_message');
const User = require('./database/models/user.model');
const message_contructor = require('./helpers/message_body');
const { createSlackUser } = require('./database/writes/writes');
const receiver = new ExpressReceiver({ signingSecret: process.env.SLACK_SIGNIN_SECRET});
const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNIN_SECRET,
    receiver
})




// Lifsten for a slash command invocation
app.command('/bot', async ({ ack, payload, context }) => {
    // Acknowledge the command request
    ack();
    const valid_input = payload.text === 'hello' ? true : false;
    try {
        const user_slack_id = payload.user_id
        const username = payload.user_name
        // create slack user
        await createSlackUser(User, user_slack_id,username)
        // post response to channel
        await app.client.chat.postMessage({
            token: context.botToken,
            // Channel to send message to
            channel: payload.channel_id,
            // Include a button in the message (or whatever blocks you want!)
            "blocks": valid_input ? message_contructor.welcome_message_body : message_contructor.invalid_command_body,
            // Text in the notification
            text: 'Message From Seren Chat Bot'
        });
    }
    catch (error) {
        // log error
        console.log(error)
        await sendErrorResponse(app.client.chat, context.botToken, payload.channel_id)
    }
});






app.action('doing_well_action', async ({ ack, body, context }) => {
    // Acknowledge the button request
    ack();
    try {
        const user_slack_id = body.user.id;
        // Update the message
        await app.client.chat.update({
            token: context.botToken,
            // ts of message to update
            ts: body.message.ts,
            // Channel of message
            channel: body.channel.id,
            blocks: message_contructor.hobbies_message_body,
            text: 'Message from Seren Bot'
        });
        // update feeling field in user details
        await User.updateOne({ user_slack_id }, { $set: { feeling: "Doing Well" } })

    }
    catch (error) {
        console.log(error)
        await sendErrorResponse(app.client.chat, context.botToken, body.channel.id)
    }
});




app.action('neutral_action', async ({ ack, body, context }) => {
    // Acknowledge the button request
    ack();
    try {
        const user_slack_id = body.user.id;
        // Update the message
        await app.client.chat.update({
            token: context.botToken,
            // ts of message to update
            ts: body.message.ts,
            // Channel of message
            channel: body.channel.id,
            blocks: message_contructor.hobbies_message_body,
            text: 'Message from Seren Bot'
        });
        // update feeling field
        await User.updateOne({ user_slack_id }, { $set: { feeling: "Neutral" } })

    }
    catch (error) {
        console.log(error)
        await sendErrorResponse(app.client.chat, context.botToken, body.channel.id)
    }
});





app.action('feeling_lucky_action', async ({ ack, body, context }) => {
    // Acknowledge the button request
    ack();
    try {
        const user_slack_id = body.user.id;
        // Update the message
        await app.client.chat.update({
            token: context.botToken,
            // ts of message to update
            ts: body.message.ts,
            // Channel of message
            channel: body.channel.id,
            blocks: message_contructor.hobbies_message_body,
            text: 'Message from Seren Bot'
        });
        // update feling field
        await User.updateOne({ user_slack_id }, { $set: { feeling: "Feeling Lucky" } })
    }
    catch (error) {
        console.log(error)
        await sendErrorResponse(app.client.chat, context.botToken, body.channel.id)
    }
});






app.action('checkboxes-action', async ({ ack, body, context }) => {
    // Acknowledge the button request
    ack();
    try {
        // get the newly added hobby
        const hobby = body.actions[0].selected_options[body.actions[0].selected_options.length - 1].value
        // get all hobbies
        let hobbies = body.actions[0].selected_options
        // check if hobby already in hobbies array
        hobbies.find((h, index) => {
            // if the hobby already exist in the hobbies array
            if (h.value === hobby) {
                // delete the hobby
                hobbies.splice(index, 0)
            }
        })
        // create an array of the hobbies string
        hobbies = hobbies.reduce((prev, current) => {
            return [...prev, current.value];
        }, [])
        const user_slack_id = body.user.id;
        // Update the message
        if (body.actions[0].selected_options.length === 1) {
            await app.client.chat.postMessage({
                token: context.botToken,
                // ts of message to update
                ts: body.message.ts,
                // Channel of message
                channel: body.channel.id,
                blocks: message_contructor.thank_you_message,
                text: 'Message from Seren Bot'
            });
        }
        // update hobbies field 
        await User.updateOne({ user_slack_id }, { $set: { hobbies } })

    }
    catch (error) {
        console.log(error)
        await sendErrorResponse(app.client.chat, context.botToken, body.channel.id)
    }
});



receiver.app.get('/get-user-response/:user_slack_id',async (req, res, next) => {
    const user_slack_id = req.params.user_slack_id;
    try {
        const user_responses = await User.findOne({ user_slack_id })
       return  res.status(200).send({
            user_responses: {
                slack_id: user_slack_id,
                feeling: user_responses.feeling,
                hobbies: user_responses.hobbies
            }
        })
    } catch (error) {
        console.log(error)
    return  res.status(400).send({error:error.message})
    }
});


receiver.app.get('/get-all-users',async (req, res, next) => {
    try {
        const users = await User.find({})
       return  res.status(200).send({
           users
        })
    } catch (error) {
        console.log(error)
    return  res.status(400).send({error:error.message})
    }
});

receiver.app.get('/',async (req, res, next) => {
    try {
        const users = await User.find({})
       return  res.status(200).send({msg:"Server Listening"})
    } catch (error) {
        console.log(error)
    return  res.status(400).send({error:error.message})
    }
});

module.exports = {app, receiver}

