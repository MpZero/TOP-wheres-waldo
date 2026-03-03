import { Router } from "express";
import {
  validateCoordinates,
  getScores,
  postScore,
  getCharacters,
  getImage,
} from "../controllers/appController.js";
const router = Router();

router.get("/", getCharacters);
router.post("/", validateCoordinates);
router.get("/scores", getScores);
router.post("/scores", postScore);
router.get("/image", getImage);

export default router;
