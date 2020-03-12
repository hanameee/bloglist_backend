const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject._id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
});

module.exports = mongoose.model("User", userSchema);
