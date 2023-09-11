import mongoose from "mongoose";

export interface IImages extends mongoose.Document {
  filename: String;
  type: String;
  image : String;
}

const ImageSchema = new mongoose.Schema<IImages>({
  filename: String,
  type: String,
  image: String, // base64 encoded
});

export default mongoose.models.myImage || mongoose.model<IImages>("myImage", ImageSchema);