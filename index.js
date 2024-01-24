// const express = require("express");
// const routes = require("./router")
const app = require("./app")
const mongoose = require("mongoose");


const PORT  = 3000;
const MONGO_URL = "mongodb+srv://anubhawmaurya:autonomizeapp@cluster0.nubmliw.mongodb.net/?retryWrites=true&w=majority"


mongoose.connect(MONGO_URL).then(()=>console.log("Connected to MongoDb")).catch((e)=>console.log(e));


app.listen(PORT,()=>{
    console.log("Server listening at port 3000")
})
process.on('unhandledRejactions',(err)=>{
    console.log(err.name, err.message)
    server.close(()=>{
        process.exit(1) //0 for success and 1 for uncaught exception ,.exit shuts down the server
    })
})