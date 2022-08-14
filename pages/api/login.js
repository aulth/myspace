import connectToDb from "../../middlewares/connectToDb";
import User from '../../models/User'
import jwt from 'jsonwebtoken'
connectToDb();
const JWTSECRET = "HELLO"
const postLogin = async (req, res)=>{
    if(req.method!='POST'){
        return res.json({success:false, msg:"Method not allowed"})
    }
    let {id, password} = JSON.parse(req.body);
    id = id.toLowerCase();
    let user = await User.findOne({$or:[{'email':id}, {'phone':+id}]});
    if(user){
        if(user.password==password){
            let authtoken = jwt.sign({ name: user.name, email: user.email, phone: user.phone, photo: user.photo, id: user._id }, JWTSECRET)
            return res.json({ success: true, msg: 'Login succesfull', authtoken: authtoken, userid:user._id, name:user.name, email:user.email, photo:user.photo })
        }
        return res.json({success:false, msg:'Password Incorrect'})
    }
    return res.json({success:false, msg:"User does not exist"});
}

export default postLogin;