import connectToDb from "../../middlewares/connectToDb";
import User from '../../models/User'
import jwt from 'jsonwebtoken'
connectToDb();

const postSignup = async (req, res) => {
    console.log("Sign up api hitted")
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { name, email, password, phone, photo } = req.body;
        email = email.toLowerCase();
        if (!name || !email || !password || !phone) {
            return res.json({ success: false, msg: "Please fill all the fields" })
        }
        let user =await User.findOne({$or:[{'email':email}, {'phone':phone}]});
        if(user){
            return res.json({success:false, msg:'User already exists, Please login with valid credential'})
        }
        user = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: password,
            photo: photo
        })
        console.log(user)
        if (user) {
            let authtoken = jwt.sign({ name: user.name, email: user.email, phone: user.phone, photo: user.photo, id: user._id }, JWTSECRET)
            return res.json({ success: true, msg: 'Signup succesfull', authtoken: authtoken, userid:user._id, name:user.name, email:user.email, photo:user.photo })
        }else{
            return res.json({success:false, msg:"Sign up failed"})
        }
        
    } catch (error) {
        return res.json({success:false, msg:"Sign up failed"})
    }
}

export default postSignup;