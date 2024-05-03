import express from "express";
import {
  createCreator,
  deleteCreator,
  getAllCreator,
  updateStatus,
} from "../controllers/creator-controllers.js";
const router = express.Router();

router.route("/").post(createCreator).get(getAllCreator);
router.route("/:id").put(updateStatus).delete(deleteCreator);

export default router;
