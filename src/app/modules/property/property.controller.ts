import status from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { PropertyService } from "./property.service";


const createProperty = catchAsync(async (req: Request, res: Response) => {
    const propertyData = req.body;

    const result = await PropertyService.createProperty(propertyData);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Property created successfully",
        data: result
    })
})


const getAllProperties = catchAsync(async (req: Request, res: Response) => {
    const result = await PropertyService.getAllProperties();

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Properties retrieved successfully",
        data: result
    })
})



export const PropertyController = {
   createProperty,
    getAllProperties
}