import dbConnect from "@/lib/mongodb";
import myImage, {IImages} from "@/lib/models/Images";
import HashTable from "@/lib/models/HashTable";
import { NextResponse } from "next/server";

type responseMessage = {
  imageInfo?: IImages;
  message?: string;
  error?: string;
  id?: string;
}

async function getImage(id : string) {
  await dbConnect();
  const imageID = await HashTable.findOne({ key: id });
  if (!imageID) {
    return null;
  }
  const { imageId } = imageID;
  const res = await myImage.findOne({_id: imageId});
  if (!res) {
    return null;
  }
  return res;
}

export async function GET(req : Request, res : Response) {
  const { searchParams } = new URL(req.url);
  const imgID = searchParams.get('id');
  const resMgs : responseMessage = {};
  if (!imgID) {
    resMgs.error = 'No image name provided';
    return NextResponse.json(resMgs, { status: 400 });
  }
  const imageInfo = await getImage(imgID);
  if (!imageInfo) {
    resMgs.error = 'Image not found';
    return NextResponse.json(resMgs, { status: 404 });
  }

  resMgs.imageInfo = imageInfo;
  return NextResponse.json(resMgs, { status: 200 });
  
  


  // if (!image) {
  //   return new Response('No image name provided', { status: 400 });
  // }

  // const file = fs.readFileSync(`${storagePath}/${image}`);

  // if (!file) {
  //   return new Response('Image not found', { status: 404 });
  // }

  // return new Response(file, { headers: { 'content-type': 'image/png' } });
}