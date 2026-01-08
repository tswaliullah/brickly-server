import status from "http-status";
import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { ReviewService } from "./review.service";


const createReview = catchAsync(async (req: Request, res: Response) => {
    const reviewData = req.body;


    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Review created successfully",
        data: reviewData
    })
})


const getAllReviewsByProductId = catchAsync(async (req: Request, res: Response) => {
    const productId = req.params.id;
    const reviews = await ReviewService.getAllReviewsByProductId(productId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Reviews retrieved successfully",
        data: reviews
    })
})

const getAllReviewsByUserId = catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.id;
    const reviews = await ReviewService.getAllReviewsByUserId(userId);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Reviews retrieved successfully",
        data: reviews
    })
})


export const ReviewController = {
    createReview,
    getAllReviewsByProductId,
    getAllReviewsByUserId
}