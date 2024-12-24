const jwt = require("jsonwebtoken")
const errorHandler = require("../middleware/errorHandler");

const verifyToken = (req,res,next)=>{
    const token =req.cookies.Access_token;
    if(!token)return next (errorHandler(401,"token not authorised,please correct login"))
    jwt.verify(token,process.env.TOKENKEY,(err,user)=>{
        if(err)return next(errorHandler(401,"aunthorised user"))
        req.user=user;
        next;
    })

}
module.exports=verifyToken
