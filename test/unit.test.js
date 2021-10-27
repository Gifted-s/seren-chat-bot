
const mongoose = require("mongoose")
const { createSlackUser, dropUserCollection } = require("../src/database/writes/writes")
const message_contructor = require("../src/helpers/message_body")
const User = require("./test_db/database/models/user.model")


// test create new user 
describe('create new slack user with createSlackUser() ', () => {
    afterAll(done => {
        // Closing the DB connection allows Jest to exit successfully.
        mongoose.connection.close()
        done()
    })

    afterEach(async () => {
        await dropUserCollection(User)
    });
    test('new user should not be created if there is a user with the slack id passed  ', async () => {

        const fake_slack_id = "dkfhjkdfhkdhfkdh"
        try {
            await User.create({ user_slack_id: "dkfhjkdfhkdhfkdh", username: "test username" })
            const createdUserResponse = await createSlackUser(User, fake_slack_id, "another test username")
            expect(createdUserResponse.alreadyExist).toBe(true)
        } catch (e) {
            expect(e).toBeDefined();
        }
    });



    test('new user to be created if there is a user with the slack id passed  ', async () => {
        const fake_slack_id = "dkfhjkdfhkdhfkdh"
        try {
            const createdUserResponse = await createSlackUser(User, fake_slack_id, " test username")
            expect(createdUserResponse.alreadyExist).toBe(false)
        } catch (e) {
            expect(e).toBeDefined();
        }
    });
})












// welcome message response


describe('welcome message body', () => {
    it("must have a section", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[0].type).toBe("section")
    })

    it("must have a section that contains welcome message", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[0].text.text).toBe("*Welcome. How are you doing?*")
    })

    it("must have text type of mark down", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[0].text.type).toBe("mrkdwn")
    })

    it("have an actions section to display action buttons", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[1].type).toBe("actions")
    })
    it("must have an elements array to store the buttons ", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[1].elements).toBeDefined()
    })
    it("must have elements which are all buttons ", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        for (let i of welcome_message_body[1].elements) {
            expect(i.type).toBe("button")
        }
    })
    it("must have all the buttons which have text that are plain text ", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        for (let i of welcome_message_body[1].elements) {
            expect(i.text.type).toBe("plain_text")
        }
    })
    it("must show all the emoji in buttons ", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        for (let i of welcome_message_body[1].elements) {
            expect(i.text.emoji).toBe(true)
        }
    })
    it("must have a first button with text Doing Well ", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[1].elements[0].text.text).toBe("Doing Well :simple_smile:")
    })

    it("must have a first button with action_id doing_well_action", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[1].elements[0].action_id).toBe("doing_well_action")
    })
    it("must have a second button with text Neutral :relieved:", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[1].elements[1].text.text).toBe("Neutral :relieved:")
    })

    it("must have a second button with action_id neutral_action", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[1].elements[1].action_id).toBe("neutral_action")
    })

    it("must have a third button with text Feeling Lucky :smiley:", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[1].elements[2].text.text).toBe("Feeling Lucky :smiley:")
    })

    it("must have a third button with action_id feeling_lucky_action", () => {
        let welcome_message_body = message_contructor.welcome_message_body
        expect(welcome_message_body[1].elements[2].action_id).toBe("feeling_lucky_action")
    })

})









// invalid response request body
describe('invalid command message response body', () => {
    it("must have a section", () => {
        const invalid_command_body = message_contructor.invalid_command_body
        expect(invalid_command_body[0].type).toBe("section")
    })

    it("must have a section that contains command not found message", () => {
        const invalid_command_body = message_contructor.invalid_command_body
        expect(invalid_command_body[0].text.text).toBe('Command not found: try typing "/bot hello" command')
    })

    it("must have text type of mark down", () => {
        const invalid_command_body = message_contructor.invalid_command_body
        expect(invalid_command_body[0].text.type).toBe("mrkdwn")
    })

})





// hobbies response body
describe('hobbies message body', () => {
    it("must have a section", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].type).toBe("section")
    })

    it("must have a section that contains welcome message", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].text.text).toBe("*What are your favorite hobbies?*")
    })

    it("must have text type of mark down", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].text.type).toBe("mrkdwn")
    })

    it("have an accessory section to display checkboxes", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.type).toBe("checkboxes")
    })
    it("must have an accessory options ", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options).toBeDefined()
    })
    it("must have all the checkbpxes which have text that are plain text ", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        for (let i of hobbies_message_body[0].accessory.options) {
            expect(i.text.type).toBe("mrkdwn")
        }
    })

    it("must have a first checkbox with text *Football :soccer:*", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options[0].text.text).toBe("*Football :soccer:*")
    })

    it("must have a first checkbox with value football", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options[0].value).toBe("football")
    })


    it("must have a second checkbox with text *Music :musical_score:*", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options[1].text.text).toBe("*Music :musical_score:*")
    })

    it("must have a second checkbox with value music", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options[1].value).toBe("music")
    })

    it("must have a third checkbox with text *Sleep :sleeping:*", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options[2].text.text).toBe("*Sleep :sleeping:*")
    })

    it("must have a third checkbox with value sleep", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options[2].value).toBe("sleep")
    })

    it("must have a fourth checkbox with text *Movies :tv:*", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options[3].text.text).toBe("*Movies :tv:*")
    })

    it("must have a fourth checkbox with value movies", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options[3].value).toBe("movies")
    })

    it("must have a fifth checkbox with text *Basketball :basketball:*", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options[4].text.text).toBe("*Basketball :basketball:*")
    })

    it("must have a fifth checkbox with value basketball", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.options[4].value).toBe("basketball")
    })


    it("accessory must have an action id of checkboxes-action", () => {
        const hobbies_message_body = message_contructor.hobbies_message_body
        expect(hobbies_message_body[0].accessory.action_id).toBe("checkboxes-action")
    })

})





// bot downtime message
describe('bot downtime message response body', () => {
    it("must have a section", () => {
        const bot_downtime_message = message_contructor.bot_downtime_message
        expect(bot_downtime_message[0].type).toBe("section")
    })

    it("must have a section that contains cannot reply message", () => {
        const bot_downtime_message = message_contructor.bot_downtime_message
        expect(bot_downtime_message[0].text.text).toBe('*Sorry, Bot cannot reply to your message now. Try again later or contact support*')
    })

    it("must have text type of mark down", () => {
        const bot_downtime_message = message_contructor.bot_downtime_message
        expect(bot_downtime_message[0].text.type).toBe("mrkdwn")
    })

})




// thanks to you message
describe('thank you message response body', () => {
    it("must have a section", () => {
        const thank_you_message = message_contructor.thank_you_message
        expect(thank_you_message[0].type).toBe("section")
    })

    it("must have a section that contains thank you message", () => {
        const bot_downtime_message = message_contructor.bot_downtime_message
        expect(bot_downtime_message[0].text.text).toBe('*Sorry, Bot cannot reply to your message now. Try again later or contact support*')
    })

    it("must have text type of mark down", () => {
        const bot_downtime_message = message_contructor.bot_downtime_message
        expect(bot_downtime_message[0].text.type).toBe("mrkdwn")
    })

})


