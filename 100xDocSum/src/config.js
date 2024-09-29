import dotenv from 'dotenv';
dotenv.config();

export const config = {
    dbUrl: process.env.DB_URL,
    jwtSecret: process.env.JWT_SECRET,
    isKirat: process.env.IS_KIRAT,
    openAiApiKey: process.env.OPEN_API_SECRET_KEY,
    // geminiKey: process.env.GEMINI_KEY
};
