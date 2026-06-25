import mongoose, { Types, Schema, Document } from "mongoose";

interface INotification extends Document {
    recipient: Types.ObjectId;
    sender: Types.ObjectId;
    type: "like" | "comment" | "follow";
    post?: Types.ObjectId;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const NotificationSchema = new Schema<INotification>({
    recipient: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    type: {
        type: String,
        enum: ["like", "comment", "follow"],
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: false,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }
)

const Notification = mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;