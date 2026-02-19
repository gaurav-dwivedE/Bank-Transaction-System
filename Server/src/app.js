const express = require('express')
const app = express()
const cookieParse = require('cookie-parser')

app.use(cookieParse())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const authRouter = require("./routes/auth.routes")
const accountRouter = require("./routes/account.routes")

app.use("/api/auth", authRouter)
app.use("/api/accounts", accountRouter)




module.exports = app