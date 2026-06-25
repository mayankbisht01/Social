import cloudinary from "../config/cloudinary";

export const uploadToCloudinary = async(buffer: Buffer, folder: string) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) return reject(error);
                resolve(result?.secure_url);
            }
        );
        uploadStream.end(buffer);
    });
}