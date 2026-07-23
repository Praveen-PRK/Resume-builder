const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true, // Prevents duplicate accounts with the same email
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6 // Basic security requirement
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Export the model so we can use it in our routes
module.exports = mongoose.model('User', UserSchema);