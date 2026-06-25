import dotnev from "dotenv";
dotnev.config();

import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";
import notificationRoutes from "./routes/notification.routes";
import { initSocket } from "./socket";
import morgan from "morgan";
import logger from "./config/logger";
import "./config/redis";

const app = express();
const httpServer = http.createServer(app);

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     message: { message: "Too many requests, please try again later" }
// });

const morganStream = {
    write: (message: string) => logger.info(message.trim())
};

app.use(helmet());
app.use(cors({ 
    origin: process.env.CLIENT_URL,
    credentials: true
}));
// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cookieParser());
app.use(morgan("combined", { stream: morganStream }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

initSocket(httpServer);

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
})