import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { followUser, getUserProfile, unfollowUser, updateProfile } from "../controllers/user.controller";
import upload from "../middlewares/upload.middleware";
import { optionalAuth } from "../middlewares/optionalAuth.middleware";

const router = Router();

router.put("/me", authMiddleware, upload.single("avatar"), updateProfile);
router.post("/:id/follow", authMiddleware, followUser);
router.delete("/:id/unfollow", authMiddleware, unfollowUser);
router.get("/:id",optionalAuth ,getUserProfile);

export default router;