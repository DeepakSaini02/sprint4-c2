const express=require('express')
const mongoose=require('mongoose')
const app=express()

const connect=()=>{
    return mongoose.connect("mongodb://localhost:27017/naukri")

}


app.listen(5000,async()=>{
    await connect();
    console.log("listen on port 5000");
})