const mongoose = require('mongoose')
const  bcrypt  = require("bcryptjs")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required:[true, "Email is required for creating an account."],
        unique: [true, "User already exists."],
        math: ["^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", "Invalid email address."],
        trim: true,
        lowercas: true
    },
    name:{
        type: String,
        required: [true, "Name is required for creating an account."],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required for creating an account."],
        minLength: [6, "Password must be minimum 6 character long."],
        select: false
    }
}, {timestamps: true})


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        return next()
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return next()
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare (password, this.password)
}

const userModel = mongoose.model("User", userSchema)

module.exports = userModel