import connectToDb from "../../middlewares/connectToDb";
import jwt from 'jsonwebtoken'
import User from '../../models/User'
connectToDb();
const JWTSECRET = "HELLO"
const editUser = async (req, res)=>{
    if(req.method!='POST'){
        return res.json({success:false, msg:"This method is not allowed"})
    }
    let {name, authtoken, photo} = JSON.parse(req.body)
    if(!authtoken){
        return res.json({success:false, msg:"No authtoken provided"})
    }
    let user = jwt.verify(authtoken, JWTSECRET);
    if(!user){
        return res.json({success:false, msg:"authtoken provided is not valid, please login and retry"})
    }
    let newData = await User.findOneAndUpdate({email:user.email}, {name:name, photo:photo});
    if(!newData){
        return res.json({success:false, msg:"Update failed"})
    } 
    
    return res.json({success:true, user:{name,photo}});

}
export default editUser