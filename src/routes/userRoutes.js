import { Router } from "express";
import { userController } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/me", userController.getProfile);

router.get("/me/profile", userController.getProfileWithStats);

router.put("/me", userController.updateProfile);

router.delete("/me", userController.deleteProfile);

router.get("/", roleMiddleware("ADMIN"), userController.listUsers);

export default router;