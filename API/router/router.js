import { Router } from "express";
import checkCoords from "../controllers/appController.js";
const router = Router();

router.post("/", checkCoords);

export default router;
