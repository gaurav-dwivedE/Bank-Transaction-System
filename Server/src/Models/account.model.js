const mongoose = require('mongoose')
const  bcrypt  = require("bcryptjs")

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required for creating an account."],
        index: true,

    },
    status: {
        type: String,
        enum: ["active", "inactive", "frozen", "closed"],
        default: "active"
    },
    currency:{
        type: String,
        required: [true, "Currency is required for creating an account."],
        default: "INR"
    }
}, {timestamps: true})

accountSchema.index({ user: 1, status: 1})

const accountModel = mongoose.model("Account", accountSchema)

module.exports = accountModel