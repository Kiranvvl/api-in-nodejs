const userModel = require("../model/userModel")
const bcrypt = require("bcrypt")
const errorHandler = require('../middleware/errorHandler');
const jwt =require("jsonwebtoken");

// Register method

const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const hash = await bcrypt.hash(password, 7)
        const user = new userModel({ ...req.body, password: hash })
        const existuser = await userModel.findOne({ username: username });
        if (existuser) return next(errorHandler(401, "user already been existed"));
        const existemail = await userModel.findOne({ email: email });
        if (existemail) return next(errorHandler(401, "email already been existed"));
        const usersave = await user.save();
        res.status(200).json({
            message: "user registerd successfully",
            data: usersave
        })
    } catch (error) {

    }
}
//login method


const login = async (req,res,next)=>{
    try {
        const {email,password}=req.body;
        const user = await userModel.findOne({email:email})
        if(!user)return next (errorHandler(401,"email not valid"))
        const validpwd = await bcrypt.compare(password,user.password)
        if (!validpwd) return next(errorHandler(401,"pwd is not valid"))
        //token generating
        const token = jwt.sign({id:user._id},process.env.TOKENKEY);
        res.cookie("Access_token",token,{httponly:true}).status(200).json("login authentication success")
    } catch (error) {
        next(error)
    }
}

//update method
const updateUser = async(req,res,next)=>{
    if(req.params.id===req.user.id){
        try {
            const update = await userModel.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json({
                message:"user data has changed success",
                data:update
            })
        } catch (error) {
            next(error)
        }
    }else{
        next(errorHandler(401,("you are unAthorised person")))
    }
}


//get method
const getdata = async (req,res,next)=>{
    const readData = await userModel.findById(req.params.id)
    res.status(200).json({
        message:"i can access this page",
        data:readData

    })
}

// delete method

const deletedata = async(req,res,next)=>{
    const removedata = await userModel.findByIdAndDelete(req.params.id)
    res.status(200).json({
        message:"removed data",
        data:removedata
    })

}


module.exports={register,login,updateUser,getdata,deletedata}