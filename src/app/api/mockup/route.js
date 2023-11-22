import { NextResponse } from "next/server";
import Mockup from '../../../../lib/mongo/models/mockups';
import db from "../../../../lib/utils/db";
import fileUploader from "../../../../lib/utils/fileUploader";

export async function POST(req) {
  const formData = await req.formData();
  const img = await fileUploader(formData.get('img'))
  const data={
    name: formData.get('name'),
    category: formData.get('category'),
    imgSrc: img,
    frame: {
      top: formData.get('top'),
      left: formData.get('left'),
      width: formData.get('width'),
      height: formData.get('height')
    },
    overlay: {
      perspective: formData.get('perspective'),
      borderRadius: formData.get('borderRadius'),
      rotateX: formData.get('rotateX'),
      rotateY: formData.get('rotateY')
    }
  }
  await db.connect()
  const mockup = await new Mockup(data).save()
  return NextResponse.json({data});
}

export async function PUT(req) {
  const mockup=await req.json()
  console.log(mockup)
  await db.connect()
  const newMockup=await Mockup.findOneAndUpdate({_id:mockup._id},mockup,{new:true})
  return NextResponse.json({newMockup});
}
