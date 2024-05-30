const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {registerUser, loginUser} = require('../controllers/userController')

const router = express.Router();


router.route("/register").post(registerUser, isAuthenticatedUser)

router.route("/login").post(loginUser, isAuthenticatedUser)


module.exports = router