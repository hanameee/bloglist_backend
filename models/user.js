const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, minlength: 3 },
    name: String,
    password: { type: String, required: true }
});

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject._id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
