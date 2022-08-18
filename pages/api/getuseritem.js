import connectToDb from "../../middlewares/connectToDb";
import Item from '../../models/Item'
import jwt from 'jsonwebtoken'
const JWTSECRET = "HELLO"
connectToDb();
const getAllItem = async (req, res)=>{
    if(req.method!=='POST'){
        return res.json({success:false, msg:"This method is not allwed"})
    }
    let {authtoken} = JSON.parse(req.body);
    if(!authtoken){
        return res.json({success:false, msg:"authtoken not provided"});
    }
    let user = jwt.verify(authtoken, JWTSECRET);
    if(!user){
        return res.json({success:false, msg:"authtoken is not valid, please login and retry"})
    }
    let item = await Item.find({user:user.id});
    if(item.length<=0){
        return res.json({success:false, msg:"No item avaliable"})
    }
    return res.json({success:true, item})

}

export default getAllItem;