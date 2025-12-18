import status from "http-status";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";



const Register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.Register(req.body)

    console.log(result);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "User registered successfully..!",
        data: result
    })

})



const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body)

    const {accessToken, refreshToken, needPasswordChange} = result

    res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60
    })

    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 90
    })

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "User login successfully..!",
        data: {
            "needPasswordChange": false
        }
    })

})



export const AuthController = {
    Register,
    login
}