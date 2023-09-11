import mongoose from "mongoose";

export interface IHashTable extends mongoose.Document {
  key: string;
  imageId: string;
}

const HashTableSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  imageId: {
    type: String,
    required: true,
  }
});

export default mongoose.models.HashTable || mongoose.model<IHashTable>('HashTable', HashTableSchema);
