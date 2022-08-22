import connectToDb from "../../middlewares/connectToDb";
import jwt from 'jsonwebtoken'
import Item from '../../models/Item'
connectToDb();
const JWTSECRET = "HELLO"
const changeStatus = async (req, res)=>{
    if(req.method!='POST'){
        return res.json({success:false, msg:"This method is not allowed"})
    }
    let {authtoken, newData, id} = JSON.parse(req.body)
    if(!authtoken){
        return res.json({success:false, msg:"No authtoken provided"})
    }
    let user = jwt.verify(authtoken, JWTSECRET);
    if(!user){
        return res.json({success:false, msg:"authtoken provided is not valid, please login and retry"})
    }
    let item = await Item.findOne({_id:id});
    if(!item){
        return res.json({success:false, msg:"Item not available"})
    }
    if(item.user!==user.id){
        return res.json({success:false, msg:"You are not authorized to change the status"})
    }
    let updatedItem = await Item.findOneAndUpdate({_id:id}, newData);
    if(!updatedItem){
        return res.json({success:false, msg:"Edit failed"})
    }
    return res.json({success:true, msg:"Edit succeed"})
}
export default changeStatus