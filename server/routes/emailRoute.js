const express = require('express')
const {isAuthenticatedUser} = require('../middleware/auth')
const {connectEmail, getAllConnectedMails, getAllMailsForSelectedMail} = require('../controllers/emailController')

const router = express.Router();

router.route("/connect-email").post(isAuthenticatedUser, connectEmail)

router.route("/connected-emails").get(isAuthenticatedUser, getAllConnectedMails)

router.route("/all-emails").post(isAuthenticatedUser, getAllMailsForSelectedMail)


module.exports = router