const mongoose_instance = require("mongoose")

mongoose_instance .connect(process.env.MONGODB_CONNECTION_URL)
.then(()=>{
    console.log("MongoDB connected successfully")
})
module.exports = mongoose_instance
