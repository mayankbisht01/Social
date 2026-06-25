import mongoose from "mongoose";
import logger from "./logger";

const connectDB = async(): Promise<void> => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        logger.info("MongoDB connected ✅")
    } catch (error) {
        logger.error("MongoDB connection failed ❌", error);
        process.exit(1)
    }
};

export default connectDB;