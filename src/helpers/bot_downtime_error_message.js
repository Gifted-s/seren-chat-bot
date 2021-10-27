const message_contructor = require("./message_body");

async function sendErrorResponse(chat, bot_token, channel_id){
    await chat.postMessage({
        token: bot_token,
        // Channel to send message to
        channel: channel_id,
        // Include a button in the message (or whatever blocks you want!)
        "blocks": message_contructor.bot_downtime_message,
        // Text in the notification
        text: 'Bot could not reply this message'
    });
}
module.exports = sendErrorResponse;