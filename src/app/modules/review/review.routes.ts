import express from "express"
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post(
    "/",
    ReviewController.createReview
)


router.get(
    "/product/:id",
    ReviewController.getAllReviewsByProductId
)

router.get(
    "/user/:id",
    ReviewController.getAllReviewsByUserId
)

export const reviewRoutes = router;;