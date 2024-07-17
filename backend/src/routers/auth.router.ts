import { Router } from "express";
import { loginUsers } from "../controllers/auth.controller";

export const auth_route = Router();

auth_route.post('/login', loginUsers)