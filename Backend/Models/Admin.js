const mongoose=require('mongoose')
const User=require('./User')
const adminSchema=new mongoose.Schema()
// admin model
module.exports=User.discriminator('Admin',adminSchema)



