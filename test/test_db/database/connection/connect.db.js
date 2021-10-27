const mongoose_test_instance = require("mongoose")
require("dotenv").config();
mongoose_test_instance.connect(process.env.MONGODB_CONNECTION_TEST_URL)
.then(()=>{
    console.log("MongoDB connected successfully")
})
module.exports = mongoose_test_instance
