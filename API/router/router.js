import { Router } from "express";
import {
  validateCoordinates,
  getScores,
  postScore,
} from "../controllers/appController.js";
const router = Router();

router.post("/", validateCoordinates);
router.get("/scores", getScores);
router.post("/scores", postScore);

export default router;
