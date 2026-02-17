const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database is connected with server")
    } catch (error) {
        console.log(error?.message || "Error while connecting to the database")
        process.exit(1)
    }
}

module.exports = connectDB