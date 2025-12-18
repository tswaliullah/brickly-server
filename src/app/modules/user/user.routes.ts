import { UserController } from "./user.controller";
import express, { NextFunction, Request, Response } from "express"
import auth from "../../middlewares/auth";
import { UserRole } from "../../../generated/enums";

const router = express.Router()


router.get(
    "/me", 
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.AGENT, UserRole.USER),    
    UserController.getMyProfile
)


router.get(
    "/", 
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),    
    UserController.getAllFromDB
)


router.patch(
    "/:id/status", 
    auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),    
    UserController.changeProfileStatusOrRole
)


export const userRoutes = router;
