import mongoose from 'mongoose';

const { Schema } = mongoose;

const SummaryDataSchema = new Schema({
    name: { type: String, required: true }, 
    notionUrl: { type: String, required: true }, 
    notionData: { type: String, required: true },
    docSummary: { type: String, required: true },
    twitterUrl: { type: String, required: false },
    status: { 
        type: String, 
        enum: ['draft', 'published'],  
        default: 'draft',              
        required: true 
    }
}, { timestamps: true });

const SummaryDataModel = mongoose.model('SummaryData', SummaryDataSchema);

export { SummaryDataModel };
