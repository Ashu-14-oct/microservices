const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requied: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User;