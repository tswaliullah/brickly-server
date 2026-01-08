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


router.patch(
    "/:id",
    ReviewController.updateReview
)

router.delete(
    "/:id",
    ReviewController.deleteReview
)


export const reviewRoutes = router;;