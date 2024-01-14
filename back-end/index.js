require("dotenv").config();
const express = require("express");
const app = express();

//set up the port
const PORT = process.env.PORT ||8088;

//listening function
app.listen(PORT,function(){
    console.log(`Sever is starting at port ${PORT}`);
})