const Router = require('express').Router()
const authcontroller = require('../Controllers/authcontroller')
const passport = require('passport')
require('../Middelwares/passport_authentification').passport
const uploadImage = require('../Middelwares/uploadImage')



Router.post("/registradmin", uploadImage.single('photo'), authcontroller.registreAdmin);
Router.post("/registrcustomer", authcontroller.registerCustomer);
Router.get("/verify-now/:verificationCode", authcontroller.verifyEmail);
Router.post("/login", authcontroller.login);
Router.post("/refreshToken", passport.authenticate('jwt', { session: false }), authcontroller.refreshToken);
Router.get("/profile", passport.authenticate('jwt', { session: false }), authcontroller.profile);
Router.put('/updateprofile', passport.authenticate('jwt', { session: false }), authcontroller.updateProfile)
Router.get('/forgotpassord', authcontroller.forgotpassword)
Router.get('/resetpassord/:token', authcontroller.resetpassword)



module.exports = Router
