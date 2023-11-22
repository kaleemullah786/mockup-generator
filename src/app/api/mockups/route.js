import { NextResponse } from "next/server";
import Mockup from '../../../../lib/mongo/models/mockups';
import db from "../../../../lib/utils/db";

export async function GET(req) {
  await db.connect()
  const mockups = await Mockup.find({})
  return NextResponse.json({ mockups });
}