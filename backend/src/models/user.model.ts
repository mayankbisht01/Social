import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    bio: string;
    avatar: string;
    followers: Types.ObjectId[];
    following: Types.ObjectId[];
    isverified: boolean;
    verificationToken?: string;
    verificationTokenExpiry?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
        name: {
            type: String,
            required: [true, "name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            select: false,
            required: [true, "password is required"],
            minlength: 6,
        },
        bio: {
            type: String,
            default: "",
            maxlength: 160,
        },
        avatar: {
            type: String,
            default: "",
        },
        followers: [{
            type: Schema.Types.ObjectId,
            ref: "User"
        }],
        following: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        isverified: {
            type: Boolean,
            default: false,
        },
        verificationToken: {
            type: String,
            select: false,
        },
        verificationTokenExpiry: {
            type: Date,
            select: false,
        },
    },
    {
        timestamps: true,
    }
)
const User = mongoose.model<IUser>("User", UserSchema);

export default User;