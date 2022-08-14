import mongoose from 'mongoose'
const connection = {};
const mongodburl="mongodb+srv://usman:admin@cluster0.ikgks.mongodb.net/Panda?retryWrites=true&w=majority"
const connectToDb = async ()=>{
    if(connection.isConnected){
        console.log("Using existed connection")
        return connection.isConnected;
    }
    const db = await mongoose.connect(mongodburl)
    connection.isConnected = db.connections[0].readyState;

}
export default connectToDb;