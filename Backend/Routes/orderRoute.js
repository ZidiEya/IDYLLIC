 // routes for the order
const Router =require('express').Router()
const orderController =require('../Controllers/ordercontroller')
const passport=require('passport')
require('../Middelwares/passport_authentification').passport
Router.post('/createOrder',orderController.createOrder)
Router.get('/orderBycustomer',passport.authenticate('jwt',{session:false}),orderController.orderBycustomer)
Router.delete('/delleteorder/:id',passport.authenticate('jwt',{session:false}),orderController.delleteorder)




module.exports = Router;
