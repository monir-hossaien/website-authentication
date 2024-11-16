import {config} from "dotenv";
config();
const dbURL = process.env.MONGO_URL;
import mongoose from "mongoose";

const connectDb = async ()=>{
    try{
        await mongoose.connect(dbURL)
        console.log("Database Connected")
    }
    catch(e){
        console.log(e.message)

    }

}

export default connectDb

