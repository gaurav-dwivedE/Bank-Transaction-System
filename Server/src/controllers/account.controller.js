const accountModel = require('../models/account.model');

async function createAccountController(req, res) {
    try {
        const user = req.user
        const account = await accountModel.create({user: user._id})

        res.status(201).json({
            "status": "success",
            account
        })
    } catch (error) {
        res.status(500).json({
            "status": "failed",
            error: error?.message
        })
    }
}

module.exports = {createAccountController}

