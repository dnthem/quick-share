import dbConnect from "@/lib/mongodb";
import myImage from "@/lib/models/Images";
import HashTable from "@/lib/models/HashTable";
import { NextRequest } from "next/server";
import { getExtension, getFileName, getRandomThreeWords } from "@/utils";

type responseMessage = {
  message: string;
  error: string;
  id?: string;
}

async function insertHashTable(id : string) : Promise<string> {
  const limit = 1000000;
  let counter = 0;
  let randomString = '';
  while(counter < limit) {
    counter++;
    randomString = getRandomThreeWords();
    const isExist = await HashTable.findOne({ key: randomString });
    if (!isExist) {
      const newHash = await new HashTable({
        key: randomString,
        imageId: id,
      });
      await newHash.save();
      break;
    }
  }
  return randomString;
}


export async function POST(req: NextRequest) : Promise<Response> {
  const data = await req.formData();
  const file: File | null = data.get('image') as unknown as File;
  let resMsg: responseMessage = { message: '', error: '' };

  if (!file) {
    throw new Error('No image provided');
  }

  if (file.size > 10_000_000) { // 10mb
    throw new Error('Image too large');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('Uploaded file is not an image');
  }

  const bytes = await file.arrayBuffer();
  const bufferBase64 = Buffer.from(bytes).toString('base64');

  try {
    await dbConnect();
    const newImage = await new myImage({
      filename: getFileName(file.name),
      type: getExtension(file.name),
      size: file.size,
      image: bufferBase64,
    });
    const savedImage = await newImage.save();

    const hash = await insertHashTable(savedImage._id);
    if (!hash) {
      throw new Error('Timeout error');
    }
    resMsg.message = `Image uploaded: ${file.name}`;
    resMsg.id = hash;
    return new Response(JSON.stringify(resMsg), { status: 200 });
  } catch (e : unknown) {
    resMsg.error = e instanceof Error ? e.message : 'Internal server error';
    return new Response(JSON.stringify(resMsg), { status: 500 });
  }
}
