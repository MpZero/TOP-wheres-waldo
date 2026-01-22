import { Router } from "express";
import {
  validateCoordinates,
  getScores,
  postScore,
  getCharacters,
} from "../controllers/appController.js";
const router = Router();

router.get("/", getCharacters);
router.post("/", validateCoordinates);
router.get("/scores", getScores);
router.post("/scores", postScore);

export default router;
