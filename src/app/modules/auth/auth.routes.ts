import { AuthController } from "./auth.controller";
import express from "express"

const router = express.Router();


router.post(
    "/register",
    AuthController.Register
)


router.post(
    "/login",
    AuthController.login
)


export const authRoutes = router;
