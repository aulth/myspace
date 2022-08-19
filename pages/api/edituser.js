import connectToDb from "../../middlewares/connectToDb";
import jwt from 'jsonwebtoken'
import User from '../../models/User'
connectToDb();
const JWTSECRET = "HELLO"
const editUser = async (req, res)=>{
    if(req.method!='POST'){
        return res.json({success:false, msg:"This method is not allowed"})
    }
    let {name, email, password, authtoken, photo} = JSON.parse(req.body)
    if(!authtoken){
        return res.json({success:false, msg:"No authtoken provided"})
    }
    let user = jwt.verify(authtoken, JWTSECRET);
    if(!user){
        return res.json({success:false, msg:"authtoken provided is not valid, please login and retry"})
    }
    if(user.email!=email){
        let isEmailExists = await User.findOne({email:email});
        if(isEmailExists){
            return res.json({success:false, msg:"This email is already in used"})
        }
    }
    let newData = await User.findOneAndUpdate({email:user.email}, {name:name, photo:photo, password:password, email:email});
    if(!newData){
        return res.json({success:false, msg:"Update failed"})
    } 
    authtoken = jwt.sign({name:name, email:email, photo:photo, id:user.id}, JWTSECRET)
    return res.json({success:true, user:{name,photo,authtoken}});

}
export default editUser