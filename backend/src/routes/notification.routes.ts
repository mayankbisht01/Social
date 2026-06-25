import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { getNotifications, markAllAsRead, markAsRead } from "../controllers/notification.controller";

const router = Router();

router.get("/", authMiddleware, getNotifications);
router.put("/read-all", authMiddleware, markAllAsRead);
router.put("/:id/read", authMiddleware, markAsRead);

export default router;