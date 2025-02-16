import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});