import connectToDb from "../../middlewares/connectToDb";
import Item from '../../models/Item'
connectToDb();
const getAllItem = async (req, res)=>{
    let item = await Item.find({});
    if(!item){
        return res.json({success:false, msg:"No item avaliable"})
    }else{
        return res.json({success:true, item})
    }
}

export default getAllItem;