import connectToDb from "../../middlewares/connectToDb";
import User from '../../models/User'
connectToDb();
const getUsers = async (req, res)=>{
    let user = await User.find({});
    return res.json(user)
}

export default getUsers;