import { Router } from "express";
import { libraryController } from "../controllers/libraryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();
router.use(authMiddleware);

router.get("/", libraryController.list);
router.post("/:gameId", libraryController.addGame);
router.delete("/:gameId", libraryController.removeGame);
router.put("/:gameId/status", libraryController.updateStatus);

export default router;