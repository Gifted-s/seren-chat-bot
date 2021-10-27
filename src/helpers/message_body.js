const message_contructor = Object.freeze({
    welcome_message_body: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Welcome. How are you doing?*'
            },
        },
        {
            "type": "actions",
            "elements": [
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Doing Well :simple_smile:",
                        "emoji": true
                    },
                    "action_id": "doing_well_action"
                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Neutral :relieved:",
                        "emoji": true
                    },
                    "action_id": "neutral_action"

                },
                {
                    "type": "button",
                    "text": {
                        "type": "plain_text",
                        "text": "Feeling Lucky :smiley:",
                        "emoji": true
                    },
                    "action_id": "feeling_lucky_action"
                }
            ]
        }
    ],
    invalid_command_body: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: 'Command not found: try typing "/bot hello" command'
            }
        }
    ],
    hobbies_message_body: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*What are your favorite hobbies?*'
            },
            "accessory": {
                "type": "checkboxes",
                "options": [
                    {
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Football :soccer:*"
                        },
                        "value": "football"
                    },
                    {
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Music :musical_score:*"
                        },
                        "value": "music"
                    },
                    {
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Sleep :sleeping:*"
                        },
                        "value": "sleep"
                    },
                    {
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Movies :tv:*"
                        },
                        "value": "movies"
                    },
                    {
                        "text": {
                            "type": "mrkdwn",
                            "text": "*Basketball :basketball:*"
                        },
                        "value": "basketball"
                    }
                ],
                "action_id": "checkboxes-action"
            }
        },


    ],

    bot_downtime_message: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Sorry, Bot cannot reply to your message now. Try again later or contact support*'
            },

        }

    ],
    thank_you_message: [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '*Thank you!*'
            },

        }
    ]
})

module.exports = message_contructor