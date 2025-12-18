import pick from "../../shared/pick";
import { Request, Response } from "express";
import { UserService } from "./user.service";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userFiltersableFields } from "./user.contant";
import { IJWTPayload } from "../../types/common";
import status from "http-status";


const getAllFromDB = catchAsync(async(req: Request, res: Response) => {
    
    const filters = pick(req.query, userFiltersableFields) // searching and filtering
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]) // pagination and sorting


    const result = await UserService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Users retrive successfully..!",
        meta: result.meta,
        data: result.data
    })
})


const getMyProfile = catchAsync(async(req: Request & {user?: IJWTPayload}, res: Response) => {
    
    const user = req.user;
    const result = await UserService.getMyProfile(user as IJWTPayload)

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "My profile fetched successfully..!",
        data: result
    })
})




const changeProfileStatusOrRole = catchAsync(async(req: Request, res: Response) => {
    const {id} = req.params;
    const result = await UserService.changeProfileStatusOrRole(id, req.body);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "User profile updated successfully..!",
        data: result
    })
})


export const UserController = {
    getAllFromDB,
    getMyProfile,
    changeProfileStatusOrRole
}