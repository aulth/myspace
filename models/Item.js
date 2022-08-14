import mongoose from 'mongoose'
const ItemSchema  = new mongoose.Schema({
    title:String,
    name:String,
    phone:String,
    user:String,
    url:String,
    itemid:String,
    location:String,
    nearbyplace:String,
    rent:Number,
    category:String,
    furnished:Boolean,
    electricyincluded:Boolean,
    ac:Boolean,
    floor:String,
    photo:Array

})

mongoose.models={};
export default mongoose.model('Item', ItemSchema);