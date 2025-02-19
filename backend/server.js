import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import prisma from './lib/prisma.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import { configurePassport } from './controllers/passportStrategies.js';

dotenv.config();

const app = express();
// configurePassport()
app.use(express.json());

// Security and logging middleware
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/feedbacks', feedbackRoutes);

const PORT = process.env.PORT || 5000;

//Route to get all feedbacks
app.get('/feedbacks', async (req, res) => {
    try {
        const feedbacks = await prisma.feedback.findMany({
            include: {
                user: true,
                product: true,
            },
        });
        res.json(feedbacks);
    }  catch (error) {
        console.error("Error fetching feedbacks",error);
        res.status(500).json({error: "Error fetching feedbacks"}); //Handle Errors
    }  
})

//Route to submit feedback
app.post('/feedbacks', async (req, res) => {
    const {content, rating, userId, productId} = req.body;

    try {
        const feedback = await prisma.feedback.create({
            data: {
                content,
                rating,
                userId,
                productId,
            },
    });
    res.json(feedback);
    } catch (error) {
        console.error("Error creating feedback",error);
        res.status(500).json({error: "Error creating feedback"}); //Handle Errors
    }
})

// Use centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});