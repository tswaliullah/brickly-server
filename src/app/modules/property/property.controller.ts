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


const getSingleProperty = catchAsync(async (req: Request, res: Response) => {
    const propertyId = req.params.id;

    const result = await PropertyService.getSingleProperty(propertyId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Property retrieved successfully",
        data: result
    })
})


const updateProperty = catchAsync(async (req: Request, res: Response) => {
    const propertyId = req.params.id;
    const updateData = req.body;

    const result = await PropertyService.updateProperty(propertyId, updateData);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Property updated successfully",
        data: result
    })
})


const deleteProperty = catchAsync(async (req: Request, res: Response) => {
    const propertyId = req.params.id;

    await PropertyService.deleteProperty(propertyId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Property deleted successfully",
        data: ` Property with id ${propertyId} has been deleted`
    })
})


export const PropertyController = {
    createProperty,
    getAllProperties,
    getSingleProperty,
    updateProperty,
    deleteProperty
}