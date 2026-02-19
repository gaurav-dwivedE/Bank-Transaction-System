const router = require("express").Router()
const {createAccountController} = require("../controllers/account.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/", authMiddleware, createAccountController)


module.exports = router