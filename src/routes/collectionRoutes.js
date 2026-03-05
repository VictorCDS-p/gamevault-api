import { Router } from "express";
import { collectionController } from "../controllers/collectionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", collectionController.list);
router.post("/", collectionController.create);
router.put("/:id", collectionController.update);
router.delete("/:id", collectionController.delete);

router.post("/:collectionId/games/:gameId", collectionController.addGame);
router.delete("/:collectionId/games/:gameId", collectionController.removeGame);

export default router;