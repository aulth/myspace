import connectToDb from "../../middlewares/connectToDb";
connectToDb();
import Item from '../../models/Item'
const deleteItems = async(req, res)=>{
    // let items = await Item.deleteMany({});
    // if(items){
    //     return res.json({success:true, msg:"All items deleted", items})
    // }
    return res.json({success:false, msg:'Deletion failed'})
}
export default deleteItems