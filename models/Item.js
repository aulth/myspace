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
    electricityincluded:Boolean,
    ac:Boolean,
    available:Boolean,
    floor:String,
    photo:Array,
    email:String,

},{
    timestamps:true
})

mongoose.models={};
export default mongoose.model('Item', ItemSchema);