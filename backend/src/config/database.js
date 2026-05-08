
// mongoose allows us to connect to the database and also to create models and schemas for our data
import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import dotenv from "dotenv";


// connecting our backend to the database using the URI from the environment variables
const connectDB = async () => {
  try {

    const connectionInstance = await mongoose.connect( `${process.env.MONGO_URI}`); // connect to the database using the URI from the environment variables
    console.log(`Connected to MongoDB: ${connectionInstance.connection.host}`);
  }
   catch (error)
    {
    console.log("Error connecting to MongoDB", error);
    process.exit(1);
   } 

  finally {
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
     });
}


};

export default connectDB;