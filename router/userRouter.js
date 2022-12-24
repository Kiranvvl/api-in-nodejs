const {register,login, updateUser, getdata, deletedata} = require("../controller/userController");
const router = require("express").Router();

const verifytoken = require("../middleware/verifyToken")

router.post("/register",register)
router.post("/login",login)
router.put("/update/:id",verifytoken,updateUser)
router.get("/getdata/:id",verifytoken,getdata)
router.delete("/deletedata/:id",verifytoken,deletedata)






module.exports=router;