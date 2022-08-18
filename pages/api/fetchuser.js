import connectToDb from "../../middlewares/connectToDb";
import jwt from 'jsonwebtoken'
connectToDb();
const JWTSECRET = "HELLO"
const fetchUser = async (req, res)=>{
    if(req.method!='POST'){
        return res.json({success:false, msg:"This method is not allowed"})
    }
    let {authtoken} = JSON.parse(req.body);
    if(!authtoken){
        return res.json({success:false, msg:"No authtoken provided"})
    }
    let user = jwt.verify(authtoken, JWTSECRET);
    if(!user){
        return res.json({success:false, msg:"authtoken provided is not valid, please login and retry"})
    }
    return res.json({success:true, user})

}
export default fetchUser