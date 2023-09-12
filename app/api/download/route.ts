import dbConnect from "@/lib/mongodb";
import myImage, {IImages} from "@/lib/models/Images";
import HashTable from "@/lib/models/HashTable";
import { NextRequest, NextResponse } from "next/server";

type responseMessage = {
  imageInfo?: IImages;
  message?: string;
  error?: string;
  id?: string;
}

async function getImage(id: string) {
  try {
    await dbConnect();
    const imageID = await HashTable.findOne({ key: id });
    if (!imageID) {
      return null;
    }
    const { imageId } = imageID;
    const res = await myImage.findOne({ _id: imageId });
    if (!res) {
      return null;
    }
    return res;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

export async function GET(req: NextRequest) {

  const { searchParams } = new URL(req.url);
  const imgID = searchParams.get('id');
  const resMsg: responseMessage = {};

  if (!imgID) {
    resMsg.error = 'No image name provided';
    return NextResponse.json(resMsg, { status: 400 });
  }

  const imageInfo = await getImage(imgID);
  if (!imageInfo) {
    resMsg.error = 'Image not found';
    return NextResponse.json(resMsg, { status: 404 });
  }

  resMsg.imageInfo = imageInfo;
  return NextResponse.json(resMsg, { status: 200 });
}
