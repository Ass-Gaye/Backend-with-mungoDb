// routes checks the adress(URL path and method (GET, POST, etc.)) of the incoming request and then redirects to the right controller to handle the request and then we will send the response to the client

import { Router } from "express"; // router helps us define routes separately and then we will use it in the app.js to handle the request and then we will send the response to the client
import { registerUser, loginUser, logoutUser} from "../controllers/user.controller.js"; // import the controller function to be used in the routes

const router = Router();

router.route("/register").post(registerUser); // here we are defining the route for registering a user and then
                                        //  we will redirect to the registerUser controller function
                                        //  to handle the request and then we will send the response to the client

router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);


export default router;