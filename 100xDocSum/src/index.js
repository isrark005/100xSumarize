import express from 'express';
import mongoose from 'mongoose';
import { config } from './config.js';
import { generateToken, getPageContent, summarizeContent } from './utils.js';
import { SummaryDataModel, SummaryFlagModel } from './db.js';
import cors from 'cors';
import { acceptingSubmissionMiddleware, onlyKiratRoutes } from './middleware.js';
import cookieParser from 'cookie-parser';
const app = express();


mongoose.connect(config.dbUrl);


app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// check if accepting entries
app.get('/submission-flag/status', async (req, res) => {
    const submissionFlag = await SummaryFlagModel.findOne();

    res.json({ acceptingSubmissions: submissionFlag?.acceptEntry });
});


app.post('/my-question', acceptingSubmissionMiddleware, async (req, res) => {
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

app.patch('/summary-update', acceptingSubmissionMiddleware, async (req, res) => {
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
            .sort({ updatedAt: -1 })
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


// auth
app.post('/auth/login-kirat', (req, res) => {
    const { password } = req.body;
    if (password === config.isKirat) {
        const token = generateToken();
        res.cookie('summaryAuthToken', token, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: "none"
        });

        return res.status(200).json({ message: 'Authenticated successfully' });
    } else {
        return res.status(401).json({ message: 'Invalid password' });
    }
});

app.get('/auth/verify-kirat', (req, res) => {

    const token = req.cookies.summaryAuthToken;
    if (!token) {
        return res.status(400).json({ isAuthenticated: false });
    }

    try {
        const user = jwt.verify(token, config.jwtSecret);
        console.log(user)
        return res.status(200).json({ isAuthenticated: true });
    } catch (err) {
        return res.json({ isAuthenticated: false });
    }
});

app.post('/auth/logout', (req, res) => {
    try {
      const token = req.cookies.summaryAuthToken;
  
      if (!token) {
        return res.status(400).json({ message: 'No authentication token found' });
      }
  
      res.clearCookie('summaryAuthToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none"
      });
  
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error during logout', error: error.message });
    }
  });
  

// only kirat routes 
app.get('/summary/mark-done', onlyKiratRoutes, async (req, res) => {
    try {
      const { id } = req.query; 
      if (!id) {
        return res.status(400).json({ message: 'ID is required' });
      }
      const deletedSummary = await SummaryDataModel.findByIdAndDelete(id);
      if (!deletedSummary) {
        return res.status(404).json({ message: 'Summary not found' });
      }
  
      return res.status(200).json({ message: 'Summary marked as done and deleted' });
    } catch (error) {
      console.error("Error marking summary as done:", error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

app.delete('/summaries/clear', onlyKiratRoutes, async (req, res)=> {
    try {
        
        const result = await SummaryDataModel.deleteMany({});
        res.status(200).json({
            message: 'All summaries deleted successfully',
            deletedCount: result.deletedCount
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while deleting summaries',
            error: error.message
        });
    }
})
  

// toggle submission flag
app.post('/submission-flag/toggle', onlyKiratRoutes, async (req, res) => {
    try {
        let submissionFlag = await SummaryFlagModel.findOne();

        if (!submissionFlag) {
            submissionFlag = new SummaryFlagModel();
        }

        submissionFlag.acceptEntry = !submissionFlag.acceptEntry;
        await submissionFlag.save();

        res.status(200).json({ 
            message: `Submissions are now ${submissionFlag.acceptEntry ? 'open' : 'closed'}`, 
            submissionFlag: submissionFlag.acceptEntry 
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to toggle submission flag', error: error.message });
    }
});


app.listen(config.port, () => {
    console.log('Server is running on port 3000');
});
