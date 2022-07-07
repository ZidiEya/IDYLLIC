const Router = require('express').Router()
const listController = require('../Controllers/listcontroller')
const uploadImage = require('../Middelwares/uploadImage')
//Routes for list
Router.post('/createlist', listController.createlist)
Router.get('/getAlllist', listController.getAlllist)
Router.get('/getlistByReference', listController.getlistByReference)
Router.get('/getlistById/:id', listController.getlistById)
Router.put('/updatelist/:id', listController.updatelist)
Router.delete('/deletelist/:id', listController.deletelist)

module.exports = Router;
