import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyTokens } from "../middlewares/verifyTokens";

export const userRoute = Router();
let user_contoller = new UserController();

userRoute.post('/register', user_contoller.registerUser);
userRoute.post('/update', verifyTokens, user_contoller.updateUser);
userRoute.get('/get-all',verifyTokens, user_contoller.getAllUsers);
userRoute.get('/get-single-user', verifyTokens, user_contoller.getUserById);
userRoute.get('/get-user-by-role', verifyTokens, user_contoller.getUserByRole);
userRoute.get('/get-all-by-date-created', verifyTokens, user_contoller.getAllUsersByDateCreated);
userRoute.put('/update-role-by-admin/:user_id', verifyTokens, user_contoller.updateRoleByAdmin);
userRoute.put('/update-all-user-roles', verifyTokens, user_contoller.updateAllUsersRoleByAdmin);
userRoute.put('/soft-delete-user/:user_id', verifyTokens, user_contoller.softDeleteUser);
userRoute.put('/retrieve-deleted-user/:user_id', verifyTokens, user_contoller.retrieveDeletedUser);
userRoute.put('/retrieve-deleted-users', verifyTokens, user_contoller.retrieveAllDeletedUsers)