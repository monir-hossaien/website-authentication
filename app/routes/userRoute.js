import * as userController from "../../app/controllers/users/userController.js";
import checkLoggin from "../../middleware/userMiddleware.js";
import express from "express";
const route = express.Router();

//get method
route.get("/profile", userController.userProfile);

route.get("/register", checkLoggin, userController.userRegister);

route.post("/register", userController.register);

route.get("/login", checkLoggin, userController.userLogin);

route.post("/login", userController.login);

route.get("/logout", userController.userLogout);




export default route;