// here is where we will start our server and connect to the database
import app from "./app.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv"; // a dependency that allows us to extract environment variables from a .env file

dotenv.config({
    path: "./.env"

}); // load environment variables from the .env file

const PORT = process.env.PORT || 5000; // get the port from the environment variables or use 5000 as a default


// start the server and connect to the database
const startServer = async () => {
    try {
        console.log("ACTUAL URI:", process.env.MONGO_URI);
        
        await connectDB();
       
        app.on("error", (error) => {
           console.log("Error starting the server", error);
           throw error;
        });

         app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.log("Failed to start the server", error);
        process.exit(1);
    }
}

startServer();