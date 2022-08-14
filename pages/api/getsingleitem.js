import connectToDb from "../../middlewares/connectToDb";
import Item from '../../models/Item'
connectToDb();
const getAllItem = async (req, res)=>{
    if(req.method!=='POST'){
        return res.json({success:false, msg:"Method not allowed"})
    }
    let item = await Item.find({});
    if(!item){
        return res.json({success:false, msg:"No item avaliable"})
    }else{
        return res.json({success:true, item})
    }
}

export default getAllItem;