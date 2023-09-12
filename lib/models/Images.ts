import mongoose from "mongoose";

export interface IImages extends mongoose.Document {
  filename: string;
  type: string;
  size: number;
  image : string;
}

const ImageSchema = new mongoose.Schema<IImages>({
  filename: String,
  type: String,
  size: Number,
  image: String, // base64 encoded
});

export default mongoose.models.myImage || mongoose.model<IImages>("myImage", ImageSchema);