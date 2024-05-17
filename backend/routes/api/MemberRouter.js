const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/AuthController');
const validator = require('../../utils/Validation');
const auth = require('../../middleware/AuthMiddleware');
const MemberController = require('../../controllers/MemberController');

router.post(
    '/register',
    [
        validator.reqStringValidator('email'),
        validator.reqStringValidator('fullName'),
        validator.reqStringValidator('password'),
    ],
    AuthController.register
)

router.post(
    '/login',
    [
        validator.reqStringValidator('email'),
        validator.reqStringValidator('password'),
    ],
    AuthController.login
)

router.get(
    '/my-account',
    auth,
    AuthController.account
)
router.post(
    '/getAmount',
    MemberController.amount
)
router.post(
    '/logout',
    AuthController.logout
)

router.get(
    "/leaderboards",
    auth,
    MemberController.leaderboards
)

router.post(
    "/updateProfile",
    auth,
    [
        validator.reqStringValidator('name'),
        validator.reqStringValidator('email'),
    ],
    MemberController.setProfile
    
)

router.post(
    "/updatePassword",
    auth,
    MemberController.updatePassword
)
module.exports = router;