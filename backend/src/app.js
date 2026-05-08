//here is the file  where all reqest comes first and then we will redirect to the right controller
import express from "express";
import userRoutes from "./routes/user.route.js"; // import the user routes to be used in the app
import postRoutes from "./routes/post.route.js";


const app = express();

app.use(express.json()); // middleware to parse the request body as json

app.use("/api/v1/users", userRoutes); // here we are defining the route for the user and then we will redirect to the user routes to handle the request and then we will send the response to the client

// example route: http://localhost:4000/api/v1/users/register



app.use("/api/v1/posts", postRoutes);
// http://localhost:4000/api/v1/posts/create



export default app;