import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Images from "@/lib/models/Images";
import HashTable from "@/lib/models/HashTable";

export async function DELETE(req : NextRequest) {
  const payload = await req.json();
  const { id, password } = payload as { id: string, password: string };
  if (!id || !password) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    if (id == process.env.ADMIN_ID && password == process.env.ADMIN_PASSWORD) {
      await dbConnect();
      await Images.deleteMany({});
      await HashTable.deleteMany({});
      return NextResponse.json({ message: 'All images deleted' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong: ' + error }, { status: 500 });
  }
}