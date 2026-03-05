import { Router } from "express";
import { categoryController } from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", categoryController.listCategories);

router.get("/with-games", categoryController.listCategoriesWithGames);

router.get("/:id", categoryController.getCategory);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  categoryController.createCategory
);

export default router;