import express from 'express';
import mongoose from 'mongoose';
import { config } from './config.js';
import { generateToken, getPageContent, summarizeContent } from './utils.js';
import { SummaryDataModel } from './db.js';
import cors from 'cors';
import { onlyKiratRoutes } from './middleware.js';

const app = express();


mongoose.connect(config.dbUrl);


app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.post('/my-question', async (req, res) => {
    const data = req.body;

    try {
        const pageId = data.notionUrl.split('-').pop();

        // const existingData = await SummaryDataModel.findOne({ notionUrl: data.notionUrl });
        const existingData = false

        if (existingData) {
            res.status(200).json({
                ...existingData.toObject(),
                alreadyExists: true
            });
        } else {
            const pageContent = pageId && await getPageContent(data.notionUrl);

            if (pageContent) {
                const cleanedContent = pageContent.replace(/\n/g, ' ');
                const summarizedContent = await summarizeContent(cleanedContent, data.name);


                const summaryData = await SummaryDataModel.create({
                    ...data,
                    notionData: cleanedContent,
                    docSummary: summarizedContent
                });

                if (summaryData) {
                    res.status(200).json(summaryData);
                } else {
                    res.status(400).json({ message: "Failed to create summary data" });
                }
            } else {
                res.status(404).json({ message: "Content not found" });
            }
        }
    } catch (error) {
        console.error("Error fetching page content:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.patch('/summary-update', async (req, res) => {
    const { _id, docSummary } = req.body;

    try {
        if (_id && docSummary) {
            const updatedData = await SummaryDataModel.findByIdAndUpdate(
                _id,
                {
                    docSummary,
                    status: 'published'
                },
                { new: true }
            );

            if (updatedData) {
                res.json({ updatedData });
            } else {
                res.status(404).json({ message: "Content not found" });
            }
        } else {
            res.status(400).json({ message: "Invalid data or missing _id" });
        }
    } catch (error) {
        console.error("Error updating the summary:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/summaries', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const summaries = await SummaryDataModel.find({ status: 'published' })
            .skip(skip)
            .limit(limit)
            .exec();

        const total = await SummaryDataModel.countDocuments({ status: 'published' });

        res.json({
            summaries,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });
    } catch (error) {
        console.error("Error fetching summaries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/verify-kirat', (req, res) => {
    const { password } = req.body;
  
    
    if (password === config.isKirat) {
      const token = generateToken();
      res.cookie('jwt', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
  
      return res.status(200).json({ message: 'Authenticated successfully' });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  });


// only kirat routes 
app.get('/summary/mark-done', onlyKiratRoutes, (req, res) => {
    
    res.json({ message: 'Summary marked as done' });
  });




app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
