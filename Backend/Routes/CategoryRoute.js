const Router = require('express').Router()
const categoryController = require('../Controllers/categorycontroller')
// file to  routes of web app
Router.post('/createCategory', categoryController.createCategory)
Router.get('/getAllCategory', categoryController.getAllCategory)
Router.get('/getcategoryById/:id', categoryController.getcategoryById)
Router.get('/getcategoryByName', categoryController.getcategoryByName)
Router.put('/updateCategory/:id', categoryController.updateCategory)
Router.delete('/deleteCategory/:id', categoryController.deleteCategory)
module.exports = Router;
