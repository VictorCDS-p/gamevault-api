import { Router } from "express";
import { gameController } from "../controllers/gameController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", authMiddleware, gameController.list);

router.get("/:id", authMiddleware, gameController.findById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  gameController.create
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  gameController.update
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  gameController.delete
);

export default router;