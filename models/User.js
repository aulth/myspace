import mongoose from 'mongoose'
const UserSchema  = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    photo:String,
    password:String,
})

mongoose.models={};
export default mongoose.model('User', UserSchema);