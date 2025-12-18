import { Request, Response } from "express";
import { UserService } from "./profile.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IJWTPayload } from "../../types/common";
import status from "http-status";




const getMyProfile = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

    const user = req.user;
    const result = await UserService.getMyProfile(user as IJWTPayload)

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "My profile fetched successfully..!",
        data: result
    })
})

const updateMyProfile = catchAsync(async (req: Request & { user?: IJWTPayload }, res: Response) => {

    const user = req.user;
    const result = await UserService.updateMyProfile(user as IJWTPayload, req.body)

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Update profile successfully..!",
        data: result
    })
})




export const UserController = {
    getMyProfile,
    updateMyProfile
}