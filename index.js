const cookiparser = require("cookie-parser")
const express = require ("express");
const app = express();
require("dotenv").config();
const mongoose = require ("mongoose")
const router = require("./router/userRouter")




mongoose.connect(process.env.DBURL)
.then(()=>{
    console.log('db is connected');
}).catch((err)=>{
    console.log(err.message);
})


app.use(express.json())
app.use(cookiparser())
app.use("/api",router)

app.use((err,req,res,next)=>{
    const status = err.status||500
    const message = err.message||"internal server err"
    return res.status(status).json({
        message,status
    })
})

app.listen(process.env.PORT,()=>{
    console.log("server is connected");
})
