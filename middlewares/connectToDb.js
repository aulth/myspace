import mongoose from 'mongoose'
const connection = {};
const connectToDb = async ()=>{
    if(connection.isConnected){
        console.log("Using existed connection")
        return connection.isConnected;
    }
    const db = await mongoose.connect(process.env.mongodburl)
    connection.isConnected = db.connections[0].readyState;

}
export default connectToDb;