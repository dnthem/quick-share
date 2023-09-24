import dbConnect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Images from "@/lib/models/Images";
import HashTable from "@/lib/models/HashTable";

export async function GET() {
  try {
    await dbConnect();
    await Images.deleteMany({});
    await HashTable.deleteMany({});
    return NextResponse.json({ message: 'All images deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong: ' + error }, { status: 500 });
  }
}