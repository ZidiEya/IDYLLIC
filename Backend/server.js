//Import Libraries
const express = require("express");
const cors = require("cors");
const { success, error } = require("consola");
//Connect to Mongo DB
require("dotenv").config();
const db = require("./config/database");
const PORT = 3000 || process.env.APP_PORT;
const DOMAIN = process.env.APP_DOMAIN;
//Import custom modules
const categoryroute = require("./Routes/CategoryRoute");
const subcategoryroute = require("./Routes/subCategoryRoute");
const productroute = require('./Routes/productRoute')
const userroute = require('./Routes/UserRoute')
const orderroute = require('./Routes/orderRoute')
const listroute = require('./Routes/listRoute')
    //Create a new Express application
const app = express();
//middlewares//
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Configure Routes
app.use("/category", categoryroute);
app.use("/subcategory", subcategoryroute);
app.use("/product", productroute)
app.use("/", userroute)
app.use("/list", listroute)
app.use("/", orderroute)
    //start listening the server
    // affichage image

app.get('/getfile/:image', function(req, res) { //pour faire affichage image sur postman
    res.sendFile(__dirname + '/storages/' + req.params.image)
})
app.listen(PORT, async() => {
    try {
        success({
            message: `server started on PORT ${PORT}` + " " +
                `URL:http://localhost:${PORT}`,
            badge: true,
        });
    } catch (err) {
        error({ message: "error with server", badge: true });
    }
});