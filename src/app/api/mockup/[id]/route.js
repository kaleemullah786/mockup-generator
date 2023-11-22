import { NextResponse } from "next/server";
import Mockup from '../../../../../lib/mongo/models/mockups';
import db from "../../../../../lib/utils/db";

export async function DELETE(req, { params }) {
    const { id } = params
    await db.connect()
    const mockup = await Mockup.findOneAndDelete({ _id: id })
    return NextResponse.json({ mockup });
}
