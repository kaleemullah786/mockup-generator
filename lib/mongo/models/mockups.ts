import mongoose from 'mongoose';

interface IMockup {
    name: string;
    category: string;
    imgSrc: string;
    frame: object;
    overlay: object;
}

const mockupSchema = new mongoose.Schema<IMockup>({
    name: { type: String, required: true },
    category: { type: String, required: true },
    imgSrc: { type: String, required: true },
    frame:{type:Object,required:true},
    overlay:{type:Object,required:true}
});

const Mockup = mongoose.models.mockups || mongoose.model('mockups', mockupSchema)

export default Mockup;