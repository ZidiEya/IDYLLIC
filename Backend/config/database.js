// file fir database
const {  connect } =require('mongoose');
const { success,error} = require('consola');

const DB = process.env.APP_DB;
const connectDB = async () =>{
    try{
	await connect(DB);
	success({
	    message: `succssfully connected with database \n ${DB}`,
	    badge:true,
	});
    }catch(err){
	error({
	    message: `unable to connected with database \n ${err}`,
	    badge:true,
	});
	connectDB();
    }
};
module.exports= connectDB();
