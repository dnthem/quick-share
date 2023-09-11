import dbConnect from "@/lib/mongodb";
import myImage, { IImages } from "@/lib/models/Images";
import HashTable from "@/lib/models/HashTable";
import { NextResponse } from "next/server";
import { getExtension, getFileName, getRandomThreeWords } from "@/utils";

type responseMessage = {
  message?: string;
  error?: string;
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

export async function POST(req: Request) {
  const data = await req.formData();
  const file: File | null = data.get('image') as unknown as File;
  let resMsg: responseMessage = {};
  if (!file) {
    resMsg.error = 'No image provided';
    return NextResponse.json(resMsg, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const bufferBase64 = Buffer.from(bytes).toString('base64');

  if(bytes.byteLength > 1000000) {
    resMsg.error = 'Image too large';
    return NextResponse.json(resMsg, { status: 413 });
  }

  try {
    await dbConnect();
    const newImage = await new myImage({
      filename: getFileName(file.name),
      type: getExtension(file.name),
      image: bufferBase64,
    });
    const res = await newImage.save();

    const hash = await insertHashTable(res._id);
    if (!hash) {
      throw new Error('Timeout error');
    }
    resMsg.message = `Image uploaded: ${file.name}`;
    resMsg.id = hash;
    return NextResponse.json(resMsg, { status: 200 });
  } catch (e) {
    resMsg.error = `Error: ${e}`;
    return NextResponse.json(resMsg, { status: 500 });
  }

  // if (!image) {
  //   return new Response('No image provided', { status: 400 });
  // }
  // const imageBuffer = await image.arrayBuffer();
  // const imageBase64 = Buffer.from(imageBuffer).toString('base64');

  // const imageObject : IImages = await new myImage({
  //   filename: image.name,
  //   image: imageBase64,
  // });
  // try {
  //   await insertImage(imageObject);

  //   if (imageBuffer.byteLength > 1000000) {
  //     return new Response('Image too large', { status: 413 });
  //   } else {
  //     return new Response(`Image uploaded: ${imageBase64}`, { status: 200 });
  //   }
  // } catch (e) {
  //   return new Response(`Error: ${e}`, { status: 500 });
  // }


}
