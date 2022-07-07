const Router = require('express').Router()
const productController = require('../Controllers/productcontroller')
const uploadImage = require('../Middelwares/uploadImage')
//Routes for product

Router.post('/createproduct', uploadImage.array('photos'), productController.createproduct)
Router.get('/getAllproduct', productController.getAllproduct)
Router.get('/getproductByReference', productController.getproductByReference)
Router.get('/getproductById/:id', productController.getproductById)
Router.put('/updateproduct/:id', productController.updateproduct)
Router.delete('/deleteproduct/:id', productController.deleteproduct)

module.exports = Router;
