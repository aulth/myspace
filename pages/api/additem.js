import connectToDb from "../../middlewares/connectToDb";
import Item from '../../models/Item'
import ShortUniqueId from 'short-unique-id'
connectToDb();
import jwt from "jsonwebtoken";
const JWTSECRET = "HELLO"
const addItem = async (req, res) => {
    const uid = new ShortUniqueId({length:6})
    let itemid = uid();
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { title, location, nearbyplace, rent, category, furnished, electricityincluded, ac, floor, photo, authtoken } = JSON.parse(req.body);
        rent = +rent;
        console.log(JSON.parse(req.body))
        if (!title || !location || !nearbyplace || !rent || !category || !furnished || !electricityincluded || !ac || !floor || !photo ) {
            return res.json({ success: false, msg: "Please fill all the fields" })
        }
        if(!authtoken){
            return res.json({success:false, msg:"Token not provided, please login to add this item."})
        }
        let {email} = jwt.verify(authtoken, JWTSECRET);
        let user = email
        if(!user){
            return res.json({success:false, msg:"User not authenticated"})
        }
        console.log(user)
        let item =await Item.create({
            title,
            user,
            location,
            nearbyplace,
            rent,
            category,
            furnished,
            electricityincluded,
            ac,
            floor,
            photo,
            itemid
        })
        if (item) {
            return res.json({ success: true, msg: 'Item added succesfully'})
        }else{
            return res.json({success:false, msg:"Item not added"})
        }
    } catch (error) {
        console.log(error)
        return res.json({success:false, msg:error.msg})
    }
}

export default addItem;