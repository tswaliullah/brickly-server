import express from "express"
import { PropertyController } from "./property.controller";

const router = express.Router();


router.post(
    "/create",
    PropertyController.createProperty
)

router.get(
    "/",
    PropertyController.getAllProperties
)



export const propertyRoutes = router;
