const Router = require('express').Router()
const subcategorycontroller = require('../Controllers/subCategorycontroller')
// routes for the subcategory
Router.post('/createsubcategory', subcategorycontroller.createsubCategory)
Router.get('/getAllsubcategory', subcategorycontroller.getAllsubCategory)
Router.get('/getsubcategoryById/:id', subcategorycontroller.getsubcategoryById)
Router.get('/getsubcategoryByName', subcategorycontroller.getsubcategoryByName)
Router.put('/updatesubcategoryById/:id', subcategorycontroller.updatesubCategory)
Router.delete('/deletesubcategoryById/:id', subcategorycontroller.deletesubCategory)
module.exports = Router;
