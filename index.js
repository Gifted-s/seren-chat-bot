const { app } = require("./src/app")
app.start(process.env.PORT || 3000).then(() => console.log('⚡️ Bolt app is running!')).catch(err => console.log(err))
