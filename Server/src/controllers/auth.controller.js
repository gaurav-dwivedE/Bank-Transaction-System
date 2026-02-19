const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const sendRegistrationEmail = require("../services/email.service")

/**  
 * - user register controller
 * - POST /api/auth/register
*/
async function userRegisterController (req, res) {
    try {
        const {name, email, password} = req.body || {}
        const isExist = await userModel.findOne({email});

        if(isExist){
           return res.status(409).json({
                "status": "failed",
                "message": "User already exist with this email"
            })
        }

        const  user = await userModel.create({name, email, password});
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'});

        res.cookie("token", token);


        res.status(201).json({
            "status": "success",
            "message": "User resgistered successfully",
            token,
            user:{
                _id: user._id,
                name: user.name,
                email: user.name
            }
    
        });
    
        await sendRegistrationEmail(user.email, user.name);

    } catch (error) {
        res.status(500).json({
             "status": "failed",
             error: error.message
        })
    }
}

/**  
 * - user login controller
 * - POST /api/auth/login
*/

async function userLoginController (req, res) {
    try {
        const {email, password} = req.body || {}
        const user = await userModel.findOne({email}).select("password")

        if(!user){
            return res.status(401).json({
                "status": "failed",
                "message": "Invalid email or password"
            })
        }

        const isValidPassword = await user.comparePassword(password)
        if(!isValidPassword){
            return res.status(401).json({
                "status": "failed",
                "message": "Invalid email or password"
            })
        }


        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '3d'})

        res.cookie("token", token)

        res.status(200).json({
            "status": "success",
            "message": "User logedin successfully",
            token,
            user:{
                _id: user._id,
                name: user.name,
                email: user.name
            }
    
        })
    } catch (error) {
        res.status(500).json({
             "status": "failed",
             error: error.message
        })
    }
}


module.exports = {userRegisterController, userLoginController}