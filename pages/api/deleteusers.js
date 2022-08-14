import connectToDb from "../../middlewares/connectToDb";
connectToDb();
import User from '../../models/User'
const deleteUser = async(req, res)=>{
    // let users = await User.deleteMany({});
    // if(users){
    //     return res.json({success:true, msg:"All users deleted", users})
    // }
    return res.json({success:false, msg:'Deletion failed'})
}
export default deleteUser