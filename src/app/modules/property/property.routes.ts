import express from "express"
import { PropertyController } from "./property.controller";

const router = express.Router();

router.post(
    "/",
    PropertyController.createProperty
)

router.get(
    "/",
    PropertyController.getAllProperties
)

router.get(
    "/:id",
    PropertyController.getSingleProperty
)

router.patch(
    "/:id",
    PropertyController.updateProperty
)

router.delete(
    "/:id",
    PropertyController.deleteProperty
)

export const propertyRoutes = router;
